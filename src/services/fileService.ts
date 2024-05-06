import { TextDocument, TextEditor, Uri, window, workspace } from "vscode";
import { provideSingleton } from "../utils";

/**
 * service to promisify file related actions
 */
@provideSingleton(FileService)
export class FileService {
  public async openFileByPath(path?: string): Promise<TextEditor> {
    return new Promise((resolve, reject) => {
      if (!path) {
        reject(new Error("Invalid file path"));
        return;
      }
      workspace.openTextDocument(Uri.file(path)).then(
        (file: TextDocument) => {
          window.showTextDocument(file, 1, false).then(
            (e) => {
              resolve(e);
            },
            (error) => {
              reject(error);
            },
          );
        },
        (error) => {
          reject(error);
        },
      );
    });
  }
}
