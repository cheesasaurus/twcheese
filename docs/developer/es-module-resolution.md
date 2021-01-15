## ES Module resolution
To avoid non-meaningful imports like `import {thing} from '../../../../../../thing.js'`, the alias `/twcheese/` is used to refer to the project root.
- This works in the browser if the project is hosted at `https://{domain}/twcheese/`
- You can put the project anywhere you want in your filesystem, and the build script will work.
- Unfortunately, running tests requires the project directory to be in your drive root.
    - This can be worked around via symlinks.\
      e.g. linux, mac: `sudo ln -s /some/nested/path/to/twcheese /twcheese`\
      e.g. windows: `cd / && mklink /D twcheese \some\nested\path\to\twcheese`
    - todo: extend the esm plugin used, to support configurable aliases
