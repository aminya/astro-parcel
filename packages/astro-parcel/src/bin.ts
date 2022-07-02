import { help, parseOption } from "./options"
import { build, dev, serve } from "./lib"

async function main(args: string[]) {
  const cliOptions = parseOption(args)
  const command = cliOptions._[2] // node this_bin.js command

  if (cliOptions.help) {
    return console.log(help())
  }

  switch (command) {
    case "build": {
      await build(cliOptions)
      return
    }
    case "dev": {
      dev(cliOptions)
      return
    }
    case "serve":
    case "preview": {
      serve(cliOptions)
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
