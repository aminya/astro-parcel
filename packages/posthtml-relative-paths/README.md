# posthtml-relative-paths

Convert the absolute paths in HTML files to relative paths

Using `posthtml-relative-paths` all the absolute paths (e.g. those that start with `/`) are converted to relative paths. The algorithm is smart and considers the depth of the HTML file with respect to the root folder.

## Example

```js
import PostHTMLRelativePaths from "posthtml-relative-paths"

posthtml({
  plugins: [PostHTMLRelativePaths("./dist/index.html", "./dist")],
})
```

## API

```ts
/**
 * A Post HTML plugin that makes the urls in a HTML file relative to the root
 *
 * @param filePathGiven The HTML file path
 * @param rootGiven The root directory. Defaults to `"./dist"`
 * @param srcGiven The src directory. Defaults to `"./src"`. Used to resolve the files that are not found in the root
 *   directory.
 * @returns A POSTHTML plugin
 */
export default function PostHTMLRelativePaths(
  filePathGiven: string,
  rootGiven: string = resolve("./dist"),
  srcGiven: string = resolve("./src"),
): Plugin<Node>
```
