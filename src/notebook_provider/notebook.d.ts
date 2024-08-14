declare module "vscode" {
  export interface NotebookController {
    /**
     * An event that fires when a {@link NotebookController.rendererScripts renderer script} has send a message to
     * the controller.
     */
    readonly onDidReceiveMessage: Event<{
      readonly editor: NotebookEditor;
      readonly message: any;
    }>;

    /**
     * Send a message to the renderer of notebook editors.
     *
     * Note that only editors showing documents that are bound to this controller
     * are receiving the message.
     *
     * @param message The message to send.
     * @param editor A specific editor to send the message to. When `undefined` all applicable editors are receiving the message.
     * @returns A promise that resolves to a boolean indicating if the message has been send or not.
     */
    postMessage(message: any, editor?: NotebookEditor): Thenable<boolean>;

    asWebviewUri(localResource: Uri): Uri;
  }
}
