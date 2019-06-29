# Developer documentation

## Project structure

|dir|purpose|note|
|---|---|---|
|[quickbar/](../../quickbar/)|Links for players to copy into their quickbars|:warning:|
|[launch/](../../launch/)|Script launchers. Quickbar links point here. Used for cache control.|:warning:|
|[dist/](../../dist/)|Compiled scripts|:warning:|
|[build/](../../build/)|Stuff needed to build script launchers, compiled scripts, and quickbar links|:no_entry:|
|[conf/](../../conf/)|Configuration||
|[src/ToolSetup/](../../src/ToolSetup/)|Modules that set up tools, to be used by launchers and compiled scripts||
|[src/ToolDoc/](../../src/ToolDoc/)|Plaintext documentation about what the tools do||
|[src/ToolDebug/](../../src/ToolDebug/)|Debug processes for each tool; used by the bug reporter||
|[src/Models/](../../src/Models/)|Modules containing only domain logic. If it touches the DOM, it doesn't belong here.||
|[src/Scrape/](../../src/Scrape/)|Modules to search the DOM for various data needed. These often return Models.||
|[src/Prompt/](../../src/Prompt/)|Modules that pop open some kind of fancy prompt, when [window.prompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt) isn't good enough. Any non-presentation logic should be handled via callbacks or similar (meaning: the logic doesn't go in these modules!)||
|[src/Transform/](../../src/Transform/)|Modules that transform existing stuff in the DOM. E.g. adding extra columns to a table||
|[src/Widget/](../../src/Widget/)|Modules that spawn some standalone UI component, which could be inserted anywhere into the DOM||
|[src/Util/](../../src/Util/)|Miscellaneous singletons and procedures. Maybe this won't be a thing after some refactoring. ||
|[test/data/](../../test/data/)|Sampled data from the game, to test against||
|[test/unit/](../../test/unit/)|Unit tests for modules in src/||
|[docs/player/](../../docs/player/)|Documentation about the tools, for players||
|[docs/developer/](../../docs/developer/)|Technical documentation||
|[vendor/](../../vendor/)|External libraries, which tools depend on||

> :warning: *Everything in these dirs is automatically built. Any changes you make will be lost.*\
> :no_entry: *You shouldn't need to change anything in these dirs.*



## How to install
Make sure you have [nodejs](https://nodejs.org/en/) installed.
1. copy `conf/host.example` to `conf/host`
2. edit `conf/host`
3. cd to the project root
4. `npm install`

## How to build
You'll most likely want to rebuild after changing anything in src/
1. cd to the project root
2. `npm run build`

## How to test
1. cd to the project root
2. `npm run test`

Currently, tests can only be ran if twcheese is in your drive root (`/twcheese/`). But there's a workaround. See [ES Module Resolution](/docs/developer/es-module-resolution.md) for details.