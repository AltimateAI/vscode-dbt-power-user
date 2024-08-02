import json
import re
from datetime import  datetime
import jupyter_client
import queue

# Notebook kernel which will responsible for creating kernel executors for each notebook
# should shut down kernel after notebook is closed
# also store the cell outputs/data and use it for further executions
# TODO: implement as required - extract to separate file


# a method which will be called once a notebook is open, create an instance of this class
# save doc uri as unique identifier for the notebook
# initialize a jupyter kernel executor on notebook open and shutdown on close
# store results of each cell execution and update after each execution
# handle cell deletions
# destroy this instance when notebook is closed

class JupyterKernelExecutor:
    def __init__(self):
        self.kernel_manager = jupyter_client.KernelManager()
        self.kernel_manager.start_kernel()
        self.kernel_client = self.kernel_manager.client()
        self.kernel_client.start_channels()

    def execute(self, code, user_expressions=None):
        self.kernel_client.wait_for_ready()

        print("Executing code:", code, user_expressions)
        # Execute the code
        self.kernel_client.execute(code, silent=False, store_history=True, user_expressions=user_expressions)

        # Capture and return the output
        output = []
        start_time = datetime.now()
        while True:
            try:
                msg = self.kernel_client.get_iopub_msg(timeout=1)
                # print("msg", msg)
                if msg['msg_type'] == 'stream':
                    # for stdout
                    output.append({'mime': 'text/plain', 'value': msg['content']['text']})
                    break
                elif msg['msg_type'] == 'execute_result' or msg['msg_type'] == 'display_data':
                    # Flag to check if any key other than 'text/plain' exists
                    other_keys_exist = False

                    # Iterate over the keys in msg['content']['data']
                    for key, value in msg['content']['data'].items():
                        # Check if the key is not 'text/plain'
                        if key != 'text/plain':
                            # Append the dictionary to the output list
                            output.append({'mime': key, 'value': value})
                            other_keys_exist = True

                    # If no other keys exist, add the 'text/plain' value
                    if not other_keys_exist:
                        output.append({'mime': 'text/plain', 'value': msg['content']['data']['text/plain']})
                    break
                elif msg['msg_type'] == 'error':
                    output.append({'mime': 'text/plain', 'value': '\n'.join(msg['content']['traceback'])})
                    break
                elif msg['msg_type'] == 'status' and msg['content']['execution_state'] == 'idle':
                    break
            except queue.Empty:
                if (datetime.now() - start_time).total_seconds() > 30:  # Timeout after 30 seconds
                    break
        return output

    def shutdown(self):
        # Shutdown the kernel client and kernel manager
        self.kernel_client.stop_channels()
        self.kernel_manager.shutdown_kernel()
        del self.kernel_client

class AltimateNotebookKernel:
    def __init__(self, doc_uri):
        """
        Initialize the AltimateNotebookKernel instance.
        
        Parameters:
        doc_uri (str): The unique identifier for the notebook.
        """
        self.doc_uri = doc_uri
        self.kernel_executor = self.initialize_kernel_executor()
        self.cell_results = {}

    def close_notebook(self):
        """
        Method to be called when the notebook is closed.
        Shuts down the Jupyter kernel executor.
        """
        if self.kernel_executor:
            self.shutdown_kernel_executor()
            self.kernel_executor = None
            print(f"Notebook {self.doc_uri} closed and kernel shut down.")

    def initialize_kernel_executor(self):
        """
        Initializes the Jupyter kernel executor.
        
        Returns:
        kernel_executor: The initialized kernel executor.
        """
        kernel_executor = JupyterKernelExecutor()
        return kernel_executor

    def shutdown_kernel_executor(self):
        """
        Shuts down the Jupyter kernel executor.
        """
        # Placeholder for actual kernel shutdown logic
        print("Kernel executor shut down.")
    
    def get_sql_result_by_cell(self, cell_id):
        code = f"cell_{cell_id}"
        return self.kernel_executor.execute(code)

    def store_sql_result(self, cell_id, result):
        """
        Stores the result of a cell execution.
        
        Parameters:
        cell_id (str): The unique identifier for the cell.
        result: The result of the cell execution.
        """
        # Convert the result to a string representation
        if isinstance(result, (list, dict)):
            # result_str = {"mime": "application/json", "value": json.dumps(result)}
            result_str = json.dumps(result)
        else:
            # result_str =  {"mime": "text/plain", "value": str(result)}
            result_str =  str(result)
        
        # Construct the code to store the result in the Jupyter kernel
        code = f"""
        cell_{cell_id} = {result_str}
        """
        self.kernel_executor.execute(code)
        
    def execute_python(self, code):
        """
        Executes a cell and stores the result.
        
        Parameters:
        cell_id (str): The unique identifier for the cell.
        code (str): The code to be executed in the cell.
        
        Returns:
        result: The result of the cell execution.
        """
        response = self.kernel_executor.execute(code, self.cell_results)
        return response

    def delete_cell(self, cell_id):
        """
        Handles cell deletion.
        
        Parameters:
        cell_id (str): The unique identifier for the cell to be deleted.
        """
        if cell_id in self.cell_results:
            del self.cell_results[cell_id]
            print(f"Cell {cell_id} deleted.")

    def destroy_instance(self):
        """
        Destroys the instance when the notebook is closed.
        """
        self.close_notebook()
        self.cell_results.clear()
        print(f"Instance for notebook {self.doc_uri} destroyed.")

def initialize_kernel(doc_uri: str):
    """
    Initialize the AltimateNotebookKernel instance.
    
    Returns:
    notebook_kernel: The initialized AltimateNotebookKernel instance.
    """
    return AltimateNotebookKernel(doc_uri)