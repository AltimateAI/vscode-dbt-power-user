import { MarkdownString } from "vscode";
import { NodeMetaType, SourceMetaType } from "../domain";

export function generateHoverMarkdownString(
  node: NodeMetaType | SourceMetaType,
  nodeType: string,
): MarkdownString {
  const content = new MarkdownString();
  content.supportHtml = true;
  content.isTrusted = true;
  content.appendMarkdown(
    `<span style="color:#347890;">(${nodeType})&nbsp;</span><span><strong>${node.name}</strong></span>`,
  );
  if (node.description !== "") {
    content.appendMarkdown(`</br><span>${node.description}</span>`);
  }
  content.appendText("\n");
  content.appendText("\n");
  content.appendMarkdown("---");
  content.appendText("\n");
  content.appendText("\n");
  for (const colKey in node.columns) {
    const column = node.columns[colKey];
    content.appendMarkdown(
      `<span style="color:#347890;">(column)&nbsp;</span><span>${column.name} &nbsp;</span>`,
    );
    if (column.data_type !== null) {
      content.appendMarkdown(
        `<span>-&nbsp;${column.data_type.toUpperCase()}</span>`,
      );
    }
    if (column.description !== "") {
      content.appendMarkdown(
        `<br/><span><em>${column.description}</em></span>`,
      );
    }
    content.appendMarkdown("</br>");
  }
  return content;
}
