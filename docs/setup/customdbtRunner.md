In case you want to use a custom runner. You can overwrite the import string for it.

For an example, you have module `my_custom_runner`:

```
from dbt.cli.main import dbtRunner

class dbtCustomRunner(dbtRunner):
    def invoke(self, *args, **kwargs):
        print("Hello from overwritten runner!")
        print("Staring invoke...")
        return dbtRunner.invoke(self, *args, **kwargs)
        print("Invoke finished!")

dbt.dbtCustomRunnerImport = from my_custom_runner import dbtCustomRunner as dbtRunner
```
