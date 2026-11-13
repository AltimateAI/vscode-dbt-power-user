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

// Base of `PythonGatedClientMapper`, which inversify.config builds at load.
export class ClientMapper {
  constructor(..._args: unknown[]) {}
  async initializeNotebookClient(
    _notebookUri: unknown,
  ): Promise<NotebookKernelClient> {
    return mockNotebookKernelClient;
  }
  async getNotebookClient(
    _notebookUri: unknown,
  ): Promise<NotebookKernelClient> {
    return mockNotebookKernelClient;
  }
}
