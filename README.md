# astro-parcel

Build and optimize your astro project using Parcel

## CLI

```
astro-parcel <command> [options]
Build and optimize your astro project using Parcel

Commands
build
dev
serve

Options
--astroDist <string = "./dist">     the directory that astro writes the build result to
--parcelDist <string = "./dist">    the directory to output the parcel result
--astroJs <string = resolved>       the astro cli js path
--parcelJs <string = resolved>      the parcel cli js path
--nodeBin  <string = current node>  the node bin path
Extra arguments are directly passed to Astro and then Parcel

```

To use astro-parcel, you should configure your Astro project like normal. Then, call the astro-parcel commands.

To build the project:

```
astro-parcel build
```

You can also specify the build directory for Astro or Parcel.

```
astro-parcel build --astroDist "./dist" --parcelDist "./parcel-dist"
```

You can also specify the path to the Astrojs or Parceljs.

```
astro-parcel build --astroDist "./dist" --parcelDist "./parcel-dist" --parcelJs "./node_modules/parcel/lib/bin.js" --astroJs "./node_modules/astro/dist/cli/index.js"
```

## Why

Astro is a great framework for making websites, and Parcel provides awesome bundling and optimization functionality. This package makes it possible to use Astro with Parcel.
