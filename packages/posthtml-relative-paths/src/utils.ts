/** Convert path to Posix path */
export function toPosixPath(path: string) {
  return path.replace(/\\/g, "/")
}

/** Prepend ./ to a path if it already doesn't have it */
export function prependDot(path: string) {
  return path.startsWith("./") || path.startsWith("..") ? path : `./${path}`
}

/** Prepend ./ to a path if it already doesn't have it */
export function removeDot(path: string) {
  if (path.startsWith("./")) {
    return path.slice(2)
  }
  return path
}
