import { MarkdownString, Uri } from "vscode";
import {
  MacroMetaData,
  NodeMetaData,
  NodeMetaType,
  SourceMetaType,
} from "../domain";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";

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
  addSeparator(content);
  for (const colKey in node.columns) {
    const column = node.columns[colKey];
    content.appendMarkdown(
      `<span style="color:#347890;">(column)&nbsp;</span><span>${column.name} &nbsp;</span>`,
    );
    if (column.data_type !== null) {
      content.appendMarkdown(
        `<span>-&nbsp;${column.data_type.toLowerCase()}</span>`,
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

export const generateMacroHoverMarkdown = (
  node: MacroMetaData,
  referencedBy: (MacroMetaData | NodeMetaData)[],
  event: ManifestCacheProjectAddedEvent,
) => {
  const content = new MarkdownString();
  content.supportHtml = true;
  content.isTrusted = true;
  content.appendMarkdown(
    `<span style="color:#347890;">(Macro)&nbsp;</span><span><strong>${node.name}</strong></span>`,
  );
  if (node.description !== "") {
    content.appendMarkdown(`</br><span>${node.description}</span>`);
  }
  addSeparator(content);
  node.arguments?.forEach((macroArg) => {
    content.appendMarkdown(
      `<span style="color:#347890;">(argument)&nbsp;</span><span>${macroArg.name} &nbsp;</span>`,
    );
    if (macroArg.type !== null) {
      content.appendMarkdown(
        `<span>-&nbsp;${macroArg.type.toLowerCase()}</span>`,
      );
    }
    if (macroArg.description !== "") {
      content.appendMarkdown(
        `<br/><span><em>${macroArg.description}</em></span>`,
      );
    }
    content.appendMarkdown("</br>");
  });

  if (referencedBy.length) {
    addSeparator(content);
    content.appendMarkdown(
      `<span style="color:#347890;">(Referenced by)&nbsp;</span><span>${referencedBy
        .map((node) => buildLink(node))
        .join(",&nbsp;")}</span>`,
    );
    content.appendMarkdown("</br>");
  }

  if (node.depends_on.macros?.length || node.depends_on.nodes?.length) {
    const dependsOn = [
      ...(node.depends_on.macros?.map((m) =>
        [...event.macroMetaMap.values()].find((macro) => macro.uniqueId === m),
      ) || []),
      ...(node.depends_on.nodes?.map((m) =>
        [...event.nodeMetaMap.values()].find((macro) => macro.uniqueId === m),
      ) || []),
    ];
    addSeparator(content);
    content.appendMarkdown(
      `<span style="color:#347890;">(Depends on)&nbsp;</span><span>${dependsOn
        .map((node) => buildLink(node))
        .join(",&nbsp;")}</span>`,
    );
  }

  return content;
};

const addSeparator = (content: MarkdownString) => {
  content.appendText("\n");
  content.appendText("\n");
  content.appendMarkdown("---");
  content.appendText("\n");
  content.appendText("\n");
};

const buildLink = (node: MacroMetaData | NodeMetaData | undefined) => {
  if (!node) {
    return;
  }
  if (!node.path) {
    return node.name;
  }

  return `[${node.name}](${Uri.file(node.path)} "${node.uniqueId}")`;
};
