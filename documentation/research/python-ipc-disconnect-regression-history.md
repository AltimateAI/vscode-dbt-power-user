# Python IPC Disconnect Regression History

Date: 2026-07-10

## Conclusion

The `Error [ERR_IPC_DISCONNECTED]: IPC channel is already disconnected` failure in dbt Core query execution was **not introduced recently**.

The breaking change was [PR #1177, “Ensure thread is ended”](https://github.com/AltimateAI/vscode-dbt-power-user/pull/1177), merged on May 30, 2024 as commit [`871464ef`](https://github.com/AltimateAI/vscode-dbt-power-user/commit/871464efb4cada00fce7de379e81f3ae6c0f277d). It added unconditional query-bridge cleanup:

```ts
finally {
  await queryThread.end();
}
```

The first affected extension release was **0.39.16**, published on May 30, 2024. Tag `0.39.15` does not contain the cleanup; tag `0.39.16` does.

## Causal chain

1. [PR #906, “Support query cancellation”](https://github.com/AltimateAI/vscode-dbt-power-user/pull/906), merged February 16, 2024, created a separate Python bridge for each query and cancelled it with `queryThread.kill(2)`.
2. PR #906 did not end that per-query bridge. That leaked a process/connection, but did not create the exact kill-then-disconnect failure.
3. PR #1177 added `await queryThread.end()` to a `finally` block.
4. The pinned `python-bridge` implementation aliases `end` to `disconnect`, and `disconnect()` calls `ps.disconnect()` without checking whether the child IPC channel is still connected. See [`index.js` lines 87–96](https://github.com/mdesmet/node-python-bridge/blob/6c37181b41710c7b83e08b5c67de5ec0bc759010/index.js#L87-L96).
5. After cancellation, a Python crash, or another child-process exit, IPC can already be closed when the `finally` block runs. The second disconnect throws `ERR_IPC_DISCONNECTED` and can replace the original query, adapter, or cancellation error.

In short:

```text
query cancellation / Python exit
  -> queryThread.kill(2) or child exits
  -> IPC closes
  -> finally calls queryThread.end()
  -> python-bridge calls ps.disconnect() again
  -> ERR_IPC_DISCONNECTED masks the original result
```

## PR attribution

| Change                                                                                                             | Role in the failure                                                                                                                      | First release          |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| [PR #160](https://github.com/AltimateAI/vscode-dbt-power-user/pull/160), `Use Python bridge for Python invocation` | Adopted the bridge whose disconnect operation is not idempotent. This is the older library weakness, not the query-path regression.      | 0.8.0 (October 2022)   |
| [PR #906](https://github.com/AltimateAI/vscode-dbt-power-user/pull/906), `Support query cancellation`              | Introduced the per-query bridge and `queryThread.kill(2)`. This is the prerequisite for the cancellation-specific race.                  | 0.34.0 (February 2024) |
| [PR #1177](https://github.com/AltimateAI/vscode-dbt-power-user/pull/1177), `Ensure thread is ended`                | Added unconditional `queryThread.end()` in `finally`, completing the faulty kill/exit-then-disconnect path. **This is the breaking PR.** | **0.39.16 (May 2024)** |
| [PR #1697](https://github.com/AltimateAI/vscode-dbt-power-user/pull/1697), `refactor: use dbt integration library` | Moved the already-affected integration into `@altimateai/dbt-integration`; it did not originate the lifecycle bug.                       | 0.58.14 (October 2025) |

## Recent-release check

The recent `0.61.x` extension and `@altimateai/dbt-integration` upgrades did not introduce this teardown logic. The published package source maps for versions `0.2.1`, `0.3.0`, `0.3.1`, `0.3.2`, `0.3.3`, `0.3.4`, and `0.3.5` all retain the same combination:

```ts
queryThread.kill(2);
// ...
finally {
  await queryThread.end();
}
```

The parent of PR #1697 also has the same line in the in-repository implementation, with `git blame` attributing it to commit `871464ef`. PR #1697 deleted that local implementation and made the extracted package authoritative, preserving the behavior.

Therefore, a recent release may have made the failure more visible for a particular user or environment, but no recent extension PR created the faulty lifecycle sequence.

## Timeout interpretation

The query-panel timer records elapsed time; it does not impose an automatic extension-side query timeout. A warehouse, adapter, network, Python-process failure, or explicit cancellation can terminate the underlying operation. The unconditional bridge cleanup then masks that first failure with `ERR_IPC_DISCONNECTED`. The IPC message is therefore a secondary teardown error, not evidence by itself that VS Code cannot find or start Python.

## Evidence used

- `git log -S 'await queryThread.end()'` and `git blame` on `DBTCoreProjectIntegration.executeSQL`
- Direct comparison of tags `0.39.15` and `0.39.16`
- GitHub commit-to-PR API attribution for commits `871464ef`, `4ed6660`, and `f17bdc0`
- PR file patches for #906 and #1177
- Historical `python-bridge` source at the exact pinned commit `6c37181`
- Published npm source maps for `@altimateai/dbt-integration` versions `0.2.1` through `0.3.5`
