# Tribal Wars scripts

## Project structure
|dir|purpose|
|---|---|
|launch/|Script launchers. Quickbar links point here. Used for cache control.|
|src/|Modules|
|dist/|Compiled scripts|
|build/|stuff needed to build the script launchers and compiled scripts|
|conf/|configuration|

## How to build
Make sure you have [nodejs](https://nodejs.org/en/) installed.

1. edit conf/host
2. cd to the project root
3. `npm install`
4. `npm run build`
