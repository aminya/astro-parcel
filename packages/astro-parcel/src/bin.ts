import { parseOption } from "./options"
import { build, dev, serve } from "./lib"

async function main(args: string[]) {
  const cliOptions = parseOption(args)
  const command = cliOptions._[0] // command must be the first argument
  const extraArgs = cliOptions._.slice(1)

  switch (command) {
    case "build": {
      await build({ ...cliOptions, extraArgs })
      return
    }
    case "dev": {
      await dev({ ...cliOptions, extraArgs })
      return
    }
    case "serve":
    case "preview": {
      await serve({ ...cliOptions, extraArgs })
      return
    }
    default: {
      throw new Error(`Command ${command} is not supported`)
    }
  }
}

main(process.argv).catch((err) => {
  throw err
})
