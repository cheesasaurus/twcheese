# Tribal Wars scripts

## Project structure
|dir|purpose|
|---|---|
|launch/|Script launchers. Quickbar links point here. Used for cache control.|
|dist/|Compiled scripts|
|build/|stuff needed to build the script launchers and compiled scripts|
|conf/|configuration|
|src/ToolSetup/|Modules that set up globally-accessible actions, to be used by scripts in ToolUse|
|src/ToolUse/|Scripts that perform globally-accessible actions. **Cannot import modules**, because scripts here won't be executed in module context.|
|src/Models/|Modules containing only Domain Logic. If it touches the dom, it doesn't belong here.|
|src/Scrape/|Modules to search the dom for various data needed. These often return Models.|
|src/Prompt/|Modules that pop open some kind of fancy prompt, when [window.prompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt) isn't good enough. Any non-presentation logic should be handled via callbacks or similar (meaning: the logic doesn't go in these modules!)|
|src/Transform/|Modules that transform existing stuff in the dom. E.g. adding extra columns to a table|
|src/Widget/|Modules that spawn some standalone UI component, which could be inserted anywhere into the dom.|
|src/Util/|Miscellaneous singletons and procedures. Maybe this won't be a thing after some refactoring. |

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
