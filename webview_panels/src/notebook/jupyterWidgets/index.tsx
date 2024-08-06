import { WidgetManager } from '@jupyter-widgets/jupyterlab-manager';
import { WidgetRenderer } from '@jupyter-widgets/react';
import { IntSliderModel, IntSliderView } from '@jupyter-widgets/controls';
import { useEffect, useRef } from 'react';

const JupyterWidgets = () => {
    const widgetContainerRef = useRef<HTMLDivElement>(null);
  const widgetManagerRef = useRef<WidgetManager | null>(null);

  useEffect(() => {
    if (widgetContainerRef.current && !widgetManagerRef.current) {
      // Create a widget manager
      widgetManagerRef.current = new WidgetManager();

      // Create a sample IntSlider widget
      const model = new IntSliderModel({
        min: 0,
        max: 100,
        value: 50,
        description: 'Sample Slider',
      });

      const view = new IntSliderView({ model });

      // Render the widget
      widgetManagerRef.current.display_model(undefined, model, view)
        .then((widgetView) => {
          if (widgetContainerRef.current) {
            widgetContainerRef.current.appendChild(widgetView.el);
            widgetView.trigger('displayed');
          }
        });
    }
  }, []);

  return <div>
  <h1>Jupyter Widgets</h1>
  <div ref={widgetContainerRef}></div>;
</div>
    
}

export default JupyterWidgets