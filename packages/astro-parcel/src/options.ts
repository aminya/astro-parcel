import mri from "mri"
import { getAstroBinPath, getParcelBinPath } from "./lib"

export type Options = {
  /**
   * The directory to output the parcel result
   *
   * @default "./dist"
   */
  parcelDist: string
  /**
   * The directory that astro writes the build result to
   *
   * @default "./dist"
   */
  astroDist: string
  /**
   * The parcel cli js path
   *
   * @default resolved
   */
  parcelJs: string
  /**
   * The astro cli js path
   *
   * @default resolved
   */
  astroJs: string
  /**
   * The node bin path
   *
   * @default the current nodejs
   */
  nodeBin: string

  /**
   * The extraArgs that are passed to Astro and Parcel
   *
   * @default `[]`
   */
  extraArgs: string[]
}

export type CliOptions = Omit<Options, "extraArgs"> & {
  _: string[]
  help: boolean
}

export const optionsDefaults: Options = {
  parcelDist: "./dist",
  astroDist: "./dist",
  nodeBin: process.argv[0],
  astroJs: getAstroBinPath(),
  parcelJs: getParcelBinPath(),
  extraArgs: [],
}

export function parseOption(args: string[]) {
  return mri<CliOptions>(args, {
    boolean: ["help"],
    alias: { h: "help" },
    string: ["parcelDist", "astroDist", "parcelJs", "astroJs", "nodeBin"],
    default: optionsDefaults,
  })
}

export function help() {
  return `

  astro-parcel <command> [options]
  Build and optimize your astro project using Parcel

  Options
  --astroDist <string = "./dist">     the directory that astro writes the build result to
  --parcelDist <string = "./dist">    the directory to output the parcel result
  --astroJs <string = resolved>       the astro cli js path
  --parcelJs <string = resolved>      the parcel cli js path
  --nodeBin  <string = current node>  the node bin path
  Extra arguments are directly passed to Astro and then Parcel

  Examples
  astro-parcel build
  astro-parcel build --astroDist "./dist" --parcelDist "./parcel-dist"
  astro-parcel build --astroDist "./dist" --parcelDist "./parcel-dist" --parcelJs "./node_modules/parcel/lib/bin.js" --astroJs "./node_modules/astro/dist/cli/index.js"

`
}
