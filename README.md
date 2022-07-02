# astro-parcel

Build and optimize your Astro project using Parcel

## Install

```
npm i --save-dev astro-parcel
```

## CLI

```ps1

astro-parcel <command> [options]
Build and optimize your astro project using Parcel

Commands
build
dev
serve

Options
--astroDist <string = "./dist">     the directory that astro writes the build result to
--parcelDist <string = "./dist">    the directory to output the parcel result
--publicDir <string = "./public">   the public folder path. The files that are directly copied to parcelDist folder
--srcDir <string = "./src">         the src folder. This path is used to search for the files that are not present in astroDist folder

Extra arguments are directly passed to Astro and then Parcel

Advanced Options
--astroJs <string = resolved>       the astro cli js path
--parcelJs <string = resolved>      the parcel cli js path
--nodeBin  <string = current node>  the node bin path
```

To use astro-parcel, you should configure your Astro project like normal. Then, call the astro-parcel commands.

To build the project:

```ps1
astro-parcel build
```

You can also specify the build directory for Parcel via `--parcelDist`. If you have changed the `outDir` of Astro, you should pass it here as `--astroDist`:

```ps1
astro-parcel build --astroDist "./dist" --parcelDist "./parcel-dist"
```

To use another version of Astrojs or Parceljs pass their binary js paths via `--astroJs` and `--parcelJs`.

```ps1
astro-parcel build --astroDist "./dist" --parcelDist "./parcel-dist" --parcelJs "./node_modules/parcel/lib/bin.js" --astroJs "./node_modules/astro/dist/cli/index.js"
```

## Why

Astro is a great framework for making websites, and Parcel provides awesome bundling and optimization (e.g. Parcel-CSS, HTMLNano, etc.) functionality out of the box. This package makes it possible to use Astro with Parcel.

## Using Parcel as the CSS, LESS, SCSS Bundler

Astro's CSS bundling can result in duplicate files, while Parcel's CSS functionality is great in optimizing the CSS files. To use that, link the style files like this. Use a unique file name, so astro-parcel can resolve it in the source directory.

```astro
---

---
<head>
  <link rel="stylesheet" href="./styles.scss" class="href">
</head>
```

To use a single CSS bundle for the whole website, create a `./pages/styles.scss` and import all the CSS files used in your Page, and link it to your HTML files under the pages folder.

```scss
@use "../components/navbar/navbar.scss";
@use "../components/footer/footer.scss";
```
