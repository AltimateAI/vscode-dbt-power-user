export interface NotebookKernelClient {
  executeCell: jest.Mock;
  interrupt: jest.Mock;
}

export interface NotebookDependencies {
  kernelClient: NotebookKernelClient;
}

export const mockNotebookKernelClient: NotebookKernelClient = {
  executeCell: jest.fn(),
  interrupt: jest.fn(),
};

export const mockNotebookDependencies: NotebookDependencies = {
  kernelClient: mockNotebookKernelClient,
};
