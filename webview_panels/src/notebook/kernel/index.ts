/* eslint-disable no-underscore-dangle */
import type * as nbformat from '@jupyterlab/nbformat';
import { panelLogger } from '@modules/logger';
import { OutputItem } from 'vscode-notebook-renderer';

let stackOfWidgetsRenderStatusByOutputId: { outputId: string; container: HTMLElement; success?: boolean }[] = [];
export function renderOutput(
    outputItem: OutputItem,
    model: nbformat.IMimeBundle & {
        model_id: string;
        version_major: number;
        /**
         * This property is only used & added in tests.
         */
        _vsc_test_cellIndex?: number;
    },
    element: HTMLElement,
    logger: (message: string, category?: 'info' | 'error') => void
) {
    try {
        stackOfWidgetsRenderStatusByOutputId.push({ outputId: outputItem.id, container: element });
        renderIPyWidget(outputItem.id, model, element, logger);
    } catch (ex) {
        logger(`Error: render output ${outputItem.id} failed ${(ex as Error).toString()}`, 'error');
        throw ex;
    }
}

let widgetManagerPromise: Promise<WidgetManager> | undefined;
async function getWidgetManager(): Promise<WidgetManager> {
    if (!widgetManagerPromise) {
        function reInitializeWidgetManager(resolve?: (value: WidgetManager) => void) {
            function initializeInstance() {
                const wm = WidgetManager.instance;
                if (wm) {
                    const oldDispose = wm.dispose.bind(wm);
                    wm.dispose = () => {
                        // eslint-disable-next-line , @typescript-eslint/no-explicit-any
                        widgetManagerPromise = undefined;
                        return oldDispose();
                    };
                    if (resolve) {
                        resolve(wm);
                        resolve = undefined;
                    }
                    widgetManagerPromise = Promise.resolve(wm);
                }
            }
            initializeInstance();
            WidgetManager.onDidChangeInstance(initializeInstance);
        }
        // eslint-disable-next-line , @typescript-eslint/no-explicit-any
        widgetManagerPromise = new Promise((resolve) => reInitializeWidgetManager(resolve as any));
    }
    return widgetManagerPromise;
}

async function createWidgetView(
    widgetData: nbformat.IMimeBundle & { model_id: string; version_major: number },
    element: HTMLElement
) {
    try {
        const wm = await getWidgetManager();
        return await wm?.renderWidget(widgetData, element);
    } catch (ex) {
        // eslint-disable-next-line no-console
        panelLogger.error(`Error: Failed to render widget ${widgetData.model_id}, ${(ex as Error).toString()}`);
    }
}

const outputDisposables = new Map<string, { dispose(): void }>();
const renderedWidgets = new Map<string, { container: HTMLElement; widget?: { dispose: Function }; modelId?: string }>();
function renderIPyWidget(
    outputId: string,
    model: nbformat.IMimeBundle & {
        model_id: string;
        version_major: number;
        /**
         * This property is only used & added in tests.
         */
        _vsc_test_cellIndex?: number;
    },
    container: HTMLElement,
    logger: (message: string, category?: 'info' | 'error') => void
) {
    logger(`Rendering IPyWidget ${outputId} with model ${model.model_id} in ${container.id}`);
    if (
        renderedWidgets.has(outputId) &&
        renderedWidgets.get(outputId)?.container === container &&
        renderedWidgets.get(outputId)?.modelId === model.model_id
    ) {
        return logger('already rendering');
    }
    let timeout = 0;
    if (renderedWidgets.has(outputId)) {
        // If we're rendering another widget in the same output,
        // then disposing the previous widget and its related state takes a few ms.
        // Unfortunately the `dispose` method in IPYWidgets is sync.
        // Without this, running a cell multiple times with the same widget will result
        // in the widget not getting rendered.
        timeout = 100;
        logger('Widget was already rendering for another container, dispose that widget so we can re-render it');
        try {
            renderedWidgets.get(outputId)?.widget?.dispose();
        } catch {
            //
        }
    }
    if (container.firstChild) {
        try {
            container.removeChild(container.firstChild);
        } catch {
            //
        }
    }
    // See comments in previous section as to why timeout > 0.
    new Promise((resolve) => setTimeout(resolve, timeout))
        .then(() => {
            const output = document.createElement('div');
            output.className = 'cell-output cell-output';
            if (typeof model._vsc_test_cellIndex === 'number') {
                container.className += ` vsc-test-cell-index-${model._vsc_test_cellIndex}`;
            }
            const ele = document.createElement('div');
            ele.className = 'cell-output-ipywidget-background';
            container.appendChild(ele);
            ele.appendChild(output);
            renderedWidgets.set(outputId, { container, modelId: model.model_id });
            createWidgetView(model, ele)
                .then((w) => {
                    if (renderedWidgets.get(outputId)?.container !== container) {
                        logger('Widget container changed, hence disposing the widget');
                        w?.dispose();
                        return;
                    }
                    if (renderedWidgets.has(outputId)) {
                        renderedWidgets.get(outputId)!.widget = w;
                    }
                    const disposable = {
                        dispose: () => {
                            // What if we render the same model in two cells.
                            renderedWidgets.delete(outputId);
                            w?.dispose();
                        }
                    };
                    outputDisposables.set(outputId, disposable);
                    // Keep track of the fact that we have successfully rendered a widget for this outputId.
                    const statusInfo = stackOfWidgetsRenderStatusByOutputId.find((item) => item.outputId === outputId);
                    if (statusInfo) {
                        statusInfo.success = true;
                    }
                })
                .catch((ex) => {
                    logger(`Error: Failed to render ${outputId}, ${(ex as Error).toString()}`, 'error');
                });
        })
        .catch((ex) => {
            logger(`Error: Failed to render ${outputId}, ${(ex as Error).toString()}`, 'error');
        });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(window as any).ipywidgetsKernel = {
    renderOutput,
    disposeOutput,
    restoreWidgets,
    initialize: () => {
        requestWidgetVersion(capturedContext);
    }
};