# posthtml-relative-paths

Convert the absolute paths in HTML files to relative paths

```js
import PostHTMLRelativePaths from "posthtml-relative-paths"

posthtml({
  plugins: [PostHTMLRelativePaths("./dist/index.html", "./dist")],
})
```
