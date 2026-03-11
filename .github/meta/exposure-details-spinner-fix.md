# Fix: Exposure Details Panel Infinite Spinner

## Symptom

Clicking "Details" on an exposure node in the lineage panel shows a spinner that never resolves.

## Root Cause

**Key mismatch between node ID and `exposureMetaMap` key format.**

`exposureMetaMap` is keyed by short name (e.g., `weekly_jaffle_metrics`) — set in `altimate-dbt-integration/src/parsers/exposureParser.ts:29`:

```typescript
exposureMetaMap.set(exposure.name, { ...exposure, path: fullPath });
```

But the details panel sends the full `unique_id` as the lookup key (e.g., `exposure.jaffle_shop.weekly_jaffle_metrics`) — the node's ID in the lineage graph is always `unique_id`, and `onDetailsClick` dispatches `setSelectedTable(table)` where `table` = `unique_id`.

`getExposureDetails()` in `newLineagePanel.ts:381-383` does:

```typescript
const { exposureMetaMap } = event.event;
return exposureMetaMap.get(name); // name = "exposure.jaffle_shop.weekly_jaffle_metrics"
// map key = "weekly_jaffle_metrics"
// → returns undefined
```

The response sends `body: undefined, status: true`. In `ExposureDetails.tsx`, the `.then()` sets `data = undefined` and `isLoading = false`, but the render guard `if (isLoading || !data || !selectedTable)` keeps returning the spinner because `!data` is always `true`.

## Fix

### Primary fix — `vscode-dbt-power-user/src/webview_provider/newLineagePanel.ts`

In `getExposureDetails()` (~line 381), extract the short name from the unique_id before lookup. This is the same pattern already used by `getFunctionDetails()` at lines 398-399:

```typescript
private async getExposureDetails({
  name,
}: {
  name: string;
}): Promise<ExposureMetaData | undefined> {
  const event = this.queryManifestService.getEventByCurrentProject();
  if (!event?.event) {
    return;
  }
  const project = this.queryManifestService.getProject();
  if (!project) {
    return;
  }

  const { exposureMetaMap } = event.event;
  // Node IDs use unique_id format (exposure.project.name), but
  // exposureMetaMap is keyed by simple exposure name.
  const splits = name.split(".");
  const exposureName = splits.length >= 3 ? splits[2] : name;
  return exposureMetaMap.get(exposureName);
}
```

### Defensive fix — `altimate-frontend/.../ExposureDetails.tsx`

Add `.catch()` handler (currently missing) so that if the lookup still fails, the spinner stops and shows an error message instead of spinning forever:

```typescript
useEffect(() => {
  if (!selectedTable) return;
  getExposureDetails(selectedTable)
    .then((_data) => {
      setData(_data);
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
    });
}, [selectedTable]);
```

## Files to Change

| #   | File                                                            | Change                                                            |
| --- | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| 1   | `vscode-dbt-power-user/src/webview_provider/newLineagePanel.ts` | Extract short name from unique_id before `exposureMetaMap.get()`  |
| 2   | `altimate-frontend/.../lineage/components/ExposureDetails.tsx`  | Add `.catch()` handler to prevent infinite spinner on any failure |

## Notes

- Same bug pattern existed for functions and was fixed during UDF lineage work
- The `exposureParser` in dbt-integration intentionally keys by `exposure.name` (short name), matching how `functionParser` keys by `function.name` — changing the map key would affect other consumers
- The fix belongs in the extension layer (newLineagePanel.ts) where the ID format translation happens
