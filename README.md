# astro-parcel

Build and optimize your Astro project using Parcel

## CLI

```ps1
astro-parcel <command> [options]

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

Astro is a great framework for making websites, and Parcel provides awesome bundling and optimization functionality. This package makes it possible to use Astro with Parcel.
