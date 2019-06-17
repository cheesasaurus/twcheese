# Tribal Wars scripts

## Project structure
|dir|purpose|
|---|---|
|quickbar/|Links for players to copy into their quickbars.|
|launch/|Script launchers. Quickbar links point here. Used for cache control.|
|dist/|Compiled scripts|
|build/|stuff needed to build the script launchers and compiled scripts|
|conf/|configuration|
|src/ToolSetup/|Modules that set up globally-accessible actions, to be used by scripts in ToolUse|
|src/ToolUse/|Scripts that perform globally-accessible actions. **Cannot import modules**, because scripts here won't be executed in module context.|
|src/ToolDoc/|Plaintext documentation about what scripts in src/ToolUse/ do.|
|src/Models/|Modules containing only Domain Logic. If it touches the dom, it doesn't belong here.|
|src/Scrape/|Modules to search the dom for various data needed. These often return Models.|
|src/Prompt/|Modules that pop open some kind of fancy prompt, when [window.prompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt) isn't good enough. Any non-presentation logic should be handled via callbacks or similar (meaning: the logic doesn't go in these modules!)|
|src/Transform/|Modules that transform existing stuff in the dom. E.g. adding extra columns to a table|
|src/Widget/|Modules that spawn some standalone UI component, which could be inserted anywhere into the dom.|
|src/Util/|Miscellaneous singletons and procedures. Maybe this won't be a thing after some refactoring. |
|test/data/|Sampled data from the game, to test against|
|test/unit/|Unit tests for modules in src/|

How come scripts in src/ToolUse/ can't import modules?
- Scripts here get embedded into launchers via the build pipeline.
- A script can't "import" unless it's a module itself.
    - A module can only be executed once. Quickbar scripts should be usable multiple times without reloading the game!


## How to build
Make sure you have [nodejs](https://nodejs.org/en/) installed.

1. edit conf/host
2. cd to the project root
3. `npm install`
4. `npm run build`

## How to test
1. cd to the project root
2. `npm run test`

## es module resolution
To avoid non-meaningful imports like `import {thing} from '../../../../../../thing.js'`, the alias `/twcheese/` is used to refer to the project root.
- This works in the browser if the project is hosted at https://{domain}/twcheese/
- You can put the project anywhere you want in your filesystem, and the build script will work. Webpack supports aliases.
- Unfortunately, running tests requires the project directory to be in your drive root.
    - This can be worked around via symlinks. e.g. on windows `cd / && mklink /D twcheese \some\nested\path\to\twcheese`
    - todo: extend the esm plugin used to support configurable aliases
