import type { Node, Plugin } from "posthtml"
import { dirname, resolve, isAbsolute } from "path"
import { join, relative } from "path/posix"
import { existsSync } from "fs"
import { prependDot, toPosixPath } from "./utils"

function calculateRelativePath(url: string, filePath: string, root: string): string {
  let resolvedFile = join(root, url)

  // HACK for astro imagetools bug
  // https://github.com/RafidMuhymin/astro-imagetools/issues/102
  if (!existsSync(resolvedFile)) {
    const jpegFile = `${resolvedFile}.jpeg`
    if (existsSync(jpegFile)) {
      console.log(`Replaced ${resolvedFile} with ${jpegFile} due to astro-imagetools' bug`)
      resolvedFile = jpegFile
    }
  }

  const folder = toPosixPath(dirname(filePath))
  let relativeFile = relative(folder, resolvedFile)
  relativeFile = prependDot(relativeFile)

  return relativeFile
}

/**
 * A Post HTML plugin that makes the urls in a HTML file relative to the root
 *
 * @param filePathGiven The HTML file path
 * @param rootGiven The root directory. Defaults to `"./dist"`
 * @returns A POSTHTML plugin
 */
export function PostHTMLRelativePaths(filePathGiven: string, rootGiven: string = resolve("./dist")): Plugin<Node> {
  // make the file paths absolute and posix
  const root = toPosixPath(!isAbsolute(rootGiven) ? resolve(rootGiven) : rootGiven)
  const filePath = toPosixPath(!isAbsolute(filePathGiven) ? resolve(filePathGiven) : filePathGiven)

  return (tree: Node) => {
    tree.walk((node) => {
      if (typeof node.attrs !== "object") {
        // attrs might be void
        return node
      }

      for (const [tag, url] of Object.entries(node.attrs)) {
        // if the tag contains a url
        // and the tag is one of the followings
        // and the url starts with /
        if (typeof url === "string" && ["src", "href", "srcset"].includes(tag) && url.startsWith("/")) {
          // make it relative to the root
          node.attrs[tag] = calculateRelativePath(url, filePath, root)
        }
      }

      return node
    })
  }
}
