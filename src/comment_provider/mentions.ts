const escapeRegExp = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// convert "@john doe" to "@[john doe](john doe)" when "john doe" is a known
// display name, and any other "@john " to "@[john](john) "
export const encodeMentions = (text: string, displayNames: string[]) => {
  // Longest first so "Local Member" wins over a user named "Local"
  const names = [...new Set(displayNames.filter(Boolean))].sort(
    (a, b) => b.length - a.length,
  );
  const knownName = names.length
    ? `(?<name>${names.map(escapeRegExp).join("|")})(?![\\p{L}\\p{N}_])|`
    : "";
  const pattern = new RegExp(`@(?:${knownName}(?<word>\\S+)\\s)`, "gu");

  return text.replace(pattern, (...args) => {
    const { name, word } = args[args.length - 1] as Record<
      string,
      string | undefined
    >;
    return name ? `@[${name}](${name})` : `@[${word}](${word}) `;
  });
};
