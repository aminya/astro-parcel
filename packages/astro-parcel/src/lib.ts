import glob from "fast-glob"
import { readFile, writeFile } from "fs/promises"
import posthtml from "posthtml"
import PostHTMLRelativePaths from "posthtml-relative-paths"
import resolve from "resolve"
import { dirname, join } from "path"
import { spawnSync } from "child_process"
import { readFileSync } from "fs"
import { optionsDefaults, Options, filterParcelBuildArgs } from "./options"
import { copy } from "fs-extra"

export function getHTMLFiles(astroDist: string) {
  return glob([`${astroDist}/**/*.html`], {
    dot: true,
    cwd: process.cwd(),
    onlyFiles: true,
    absolute: true,
  })
}

export async function makeHTMLFilesRelative(astroDist: string, srcDir: string) {
  const htmlFiles = await getHTMLFiles(astroDist)
  if (htmlFiles.length === 0) {
    throw new Error(
      `No HTML files were found in ${astroDist}. If you changed the Astro's outDir, you have to pass it to astro-parcel`
    )
  }

  await Promise.all(
    htmlFiles.map(async (htmlFile) => {
      const htmlString = await readFile(htmlFile, "utf8")
      const { html } = await posthtml([PostHTMLRelativePaths(htmlFile, astroDist, srcDir)]).process(htmlString)
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
  const { astroDist, parcelDist, publicDir, srcDir, extraArgs, nodeBin, astroJs, parcelJs } = {
    ...optionsDefaults,
    ...options,
  }
  // build with astro, convert the paths, and build with parcel

  spawnSync(nodeBin, [astroJs, "build", ...extraArgs], { stdio: "inherit" })
  await copy(srcDir, astroDist, {
    recursive: true,
    filter: (file: string) => !file.endsWith(".astro"),
    overwrite: false,
  })
  await makeHTMLFilesRelative(astroDist, srcDir)
  spawnSync(nodeBin, [parcelJs, "build", "--dist-dir", parcelDist, ...filterParcelBuildArgs(extraArgs)], {
    stdio: "inherit",
  })
  await copy(publicDir, parcelDist, { recursive: true })
}

export function dev(options: Options) {
  const { extraArgs, nodeBin, astroJs } = {
    ...optionsDefaults,
    ...options,
  }

  // use astro only for the development
  spawnSync(nodeBin, [astroJs, "dev", ...extraArgs], { stdio: "inherit" })
}

export function serve(options: Options) {
  const { extraArgs } = {
    ...optionsDefaults,
    ...options,
  }

  // use parcel to serve
  spawnSync(options.nodeBin, [options.parcelJs, "serve", "--dist-dir", options.parcelDist, ...extraArgs], {
    stdio: "inherit",
  })
}
