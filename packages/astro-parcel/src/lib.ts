import glob from "fast-glob"
import { readFile, writeFile } from "fs/promises"
import posthtml from "posthtml"
import { PostHTMLRelativePaths } from "posthtml-relative-paths"
import resolve from "resolve"
import { dirname, join } from "path"
import { spawn as spawnCb } from "child_process"
import { promisify } from "util"
import { readFileSync } from "fs"
import { optionsDefaults, Options } from "./options"
const spawn = promisify(spawnCb)

export function getHTMLFiles(astro_dist: string) {
  return glob([`${astro_dist}/**/*.html`], {
    dot: true,
    cwd: process.cwd(),
    onlyFiles: true,
    absolute: true,
  })
}

export async function makeHTMLFilesRelative(astro_dist: string) {
  const htmlFiles = await getHTMLFiles(astro_dist)

  await Promise.all(
    htmlFiles.map(async (htmlFile) => {
      const htmlString = await readFile(htmlFile, "utf8")
      const { html } = await posthtml([PostHTMLRelativePaths(htmlFile, astro_dist)]).process(htmlString)
      await writeFile(htmlFile, html)
    })
  )
}

export function getParcelBinPath() {
  return resolve.sync("parcel")
}

export function getAstroBinPath() {
  const astroPackageJsonPath = resolve.sync("astro/package.json")
  const astroDir = dirname(astroPackageJsonPath)
  const astroPackageJson = JSON.parse(readFileSync(astroPackageJsonPath, "utf8"))
  const astroBin = join(astroDir, astroPackageJson.bin.astro as string)
  return astroBin
}

export async function build(options: Options) {
  const { astroDist, parcelDist, extraArgs, nodeBin, astroJs, parcelJs } = {
    ...optionsDefaults,
    ...options,
  }
  // build with astro, convert the paths, and build with parcel

  await spawn(nodeBin, [astroJs, "build", ...extraArgs], { stdio: "inherit" })
  await makeHTMLFilesRelative(astroDist)
  await spawn(nodeBin, [parcelJs, "build", "--dist-dir", parcelDist, ...extraArgs], { stdio: "inherit" })
}

export async function dev(options: Options) {
  const { extraArgs, nodeBin, astroJs } = {
    ...optionsDefaults,
    ...options,
  }

  // use astro only for the development
  await spawn(nodeBin, [astroJs, "dev", ...extraArgs], { stdio: "inherit" })
}

export async function serve(options: Options) {
  const { extraArgs } = {
    ...optionsDefaults,
    ...options,
  }

  // use parcel to serve
  await spawn(options.nodeBin, [options.parcelJs, "serve", "--dist-dir", options.parcelDist, ...extraArgs], {
    stdio: "inherit",
  })
}
