// The older-Cursor UI verdict (ui-install.mjs --loop-guard), kept free of I/O so it can be tested.
//
// result: the run's outcome ({ ok, loop, kind, step, message }).
// pick: the gallery's Power User for this target ({ version, dependencies }), or undefined.
// Cursor before 3.11 loops on a gallery install while Power User depends on ms-python.python.
export function loopGuardVerdict(result, pick, target) {
  if (!pick) {
    return {
      ...result,
      ok: false,
      kind: "HARNESS",
      step: "loop-guard",
      message: `loop guard found no Power User for ${target} in Cursor's gallery`,
    };
  }
  const expectLoop = pick.dependencies.includes("ms-python.python");
  const release = `the gallery's Power User ${pick.version} (${target})`;
  if (result.loop && expectLoop) {
    return {
      ...result,
      ok: true,
      expectedLoop: true,
      warning: `Expected: ${result.message}; ${release} still depends on ms-python.python.`,
    };
  }
  if (result.loop) {
    return {
      ...result,
      ok: false,
      message: `${result.message}, although ${release} no longer depends on ms-python.python`,
    };
  }
  if (result.ok && expectLoop) {
    return {
      ...result,
      warning: `Installed although ${release} depends on ms-python.python; the loop was expected.`,
    };
  }
  return result;
}
