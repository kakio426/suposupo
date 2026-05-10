export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const focusRing =
  "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand-300";

