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
   * The public folder path.
   *
   * The files that are directly copied to @param parcelDist folder
   *
   * @default "./public"
   */
  publicDir: string
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

export type CliOptions = Options & {
  _: string[]
  help: boolean
}

export const optionsDefaults: Options = {
  parcelDist: "./dist",
  astroDist: "./dist",
  publicDir: "./public",
  nodeBin: process.argv[0],
  astroJs: getAstroBinPath(),
  parcelJs: getParcelBinPath(),
  extraArgs: [],
}

export const cliOptionsKeys = ["parcelDist", "astroDist", "publicDir", "parcelJs", "astroJs", "nodeBin", "help", "_"]

export function parseOption(args: string[]) {
  const options = mri<CliOptions>(args, {
    boolean: ["help"],
    alias: { h: "help" },
    string: ["parcelDist", "astroDist", "publicDir", "parcelJs", "astroJs", "nodeBin"],
    default: optionsDefaults,
  })
  const extraArgs = Object.entries(options)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([arg, _value]) => !cliOptionsKeys.includes(arg))
    .map(([arg, value]) => {
      if (value === true) {
        return `--${arg}`
      }
      return `--${arg} ${value}`
    })

  options.extraArgs = extraArgs

  return options
}

export function help() {
  return `

astro-parcel <command> [options]
Build and optimize your astro project using Parcel

Commands
build
dev
serve

Options
--astroDist <string = "./dist">     the directory that astro writes the build result to
--parcelDist <string = "./dist">    the directory to output the parcel result
--publicDir <string = "./public">    The public folder path. The files that are directly copied to parcelDist folder

Extra arguments are directly passed to Astro and then Parcel

Advanced Options
--astroJs <string = resolved>       the astro cli js path
--parcelJs <string = resolved>      the parcel cli js path
--nodeBin  <string = current node>  the node bin path

Examples
astro-parcel build
astro-parcel build --astroDist "./dist" --parcelDist "./parcel-dist"
astro-parcel build --astroDist "./dist" --parcelDist "./parcel-dist" --parcelJs "./node_modules/parcel/lib/bin.js" --astroJs "./node_modules/astro/dist/cli/index.js"

`
}

// parcel errors on unknown options, so the passed arguments needs to be filtered if they are not among these
const parcelBuildOptions = [
  "--no-optimize",
  "--no-scope-hoist",
  "--public-url",
  "--no-content-hash",
  "--no-cache",
  "--config",
  "--cache-dir",
  "--no-source-maps",
  "--target",
  "--log-level",
  "--no-autoinstall",
  "--profile",
  "--detailed-report",
  "--reporter",
]

export function filterParcelBuildArgs(extraArgs: string[]) {
  return extraArgs.filter((extraArg) => parcelBuildOptions.some((parcelArg) => extraArg.startsWith(parcelArg)))
}
