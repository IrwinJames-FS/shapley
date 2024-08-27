# Shapely
Shapely is a library designed to simplify the rendering of shapes in an html document. 

## Getting Started
With shapely being in pre release its not quite ready for implementation however you are welcome to preview the library as it develops. 

Until its release shapely will not be available on npm however you can clone this repo and follow the below steps to install shapely. You must enter these commands from within the directory you cloned the repo into

```bash
npm install
```

To preview the storybook
```bash
npm run storybook
```

To build the library
```bash
npm run build
```

To add the libary to another project at this stage I dont recomment the use of npm link instead install yalc

if you dont already have yalc installed.

```bash
npm i -g yalc
```

add package to yalc repo
```bash
yalc publish
```

if you have already installed the repo and need to updated it after a pull. This will update the yalc repo and any packages that have Shapely marked as a dependency.

```bash
yalc publish --push
```

navigate to the project you wish to install shapely in and run:

```bash
yalc add @irwinproject/shapely
```

### Current Build issues
While these issues wont halt the build process you might notice class conflicts in some rare instances. This is due to dependencies that should be peerDependencies however for simplicy this will be changed in the final CI/CD build to simplify the development environment.

