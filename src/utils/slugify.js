export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, '');     // Remove starting/ending dashes
};
