import { help, parseOption } from "./options"
import { build, dev, serve } from "./lib"

async function main(args: string[]) {
  const { options: cliOptions, extraArgs } = parseOption(args)
  const command = cliOptions._[2] // node this_bin.js command

  if (cliOptions.help) {
    return console.log(help())
  }

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
