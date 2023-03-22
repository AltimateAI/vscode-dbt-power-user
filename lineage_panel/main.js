const themeStyles = {
  dark: { style: { stroke: "#C5C5C5" } },
  light: { style: { stroke: "#232b2b" } },
};

const vscode = acquireVsCodeApi();
const width = document.getElementById("container").scrollWidth;
const height = document.getElementById("container").scrollHeight || 500;
const container = document.getElementById("container");
const graph = new G6.Graph({
  container: "container",
  width,
  height,
  fitView: true,
  pixelRatio: 2.0,
  fitViewPadding: 20,
  modes: {
    default: ["zoom-canvas", "click-select", "drag-canvas"],
  },
  layout: {
    type: "dagre",
    rankdir: "LR",
    align: "UL",
    controlPoints: true,
    nodesepFunc: () => 1,
    ranksepFunc: () => 1,
  },
  defaultNode: {
    size: [280, 40],
    type: "rect",
    labelCfg: { style: { fill: "#232b2b" } },
    style: {
      fontSize: 16,
      lineWidth: 3,
    },
    stateIcon: {
      show: false,
    },
  },
  nodeStateStyles: {
    hover: {
      opacity: 0.75,
      cursor: "pointer",
    },
  },
  defaultEdge: {
    type: "polyline",
    size: 1,
    color: "#232b2b",
    style: {
      lineWidth: 2,
      endArrow: true,
    },
  },
});

graph.on("nodeselectchange", (e) => {
  if (!e.target) {
    return;
  }
  const nodeUrl = e.target._cfg.model.url;
  vscode.postMessage({
    command: "openFile",
    url: nodeUrl,
  });
});

graph.on("node:mouseenter", (e) => {
  const nodeItem = e.item; // Get the target item
  graph.setItemState(nodeItem, "hover", true);
});

graph.on("node:mouseleave", (e) => {
  const nodeItem = e.item;
  graph.setItemState(nodeItem, "hover", false);
});

const updateStyles = (theme) => {
  graph.getEdges().forEach((edge) => {
    graph.updateItem(edge, {
      ...themeStyles[theme],
    });
  });
};

window.addEventListener("message", (event) => {
  const { command } = event?.data;
  if (command === "renderGraph") {
    graph.data(event.data.graph);
    graph.render();
  } else if (command === "setStylesByTheme") {
    updateStyles(event.data.theme);
  }
});
