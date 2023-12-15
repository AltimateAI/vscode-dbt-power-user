export const getQueryPanelIframe = (page) =>
  page.frameLocator("iframe").last().frameLocator("#active-frame");

export const getLineagePanelIframe = (page) =>
  page.frameLocator("iframe").last().frameLocator("#active-frame");
