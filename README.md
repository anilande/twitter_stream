### Twitter feed
This is a node based application. using react, react route, socket.io and express
the routing is forcefully used for error page and landing page.
- i time boxed my self to 4 hours to develop this app.
- the server and routing code i refered internet
- most of the code in src folder is hand written with minimum to no refrence too internet.

# Getting Started:
### Requirements: 
nodejs, npm have been installed

### Install dependencies:
- project dependencies: `cd <project-dir> && npm install`

## Twitter cradentials
- open file src/stream.js and replace the credentials with test credentials

### build app
- run : `webpack`

### Start local server:
- run : `node_modules/.bin/babel-node --presets 'react,es2015' src/stream.js` (presets are already part of the package but for a clarity i added it to the commend)
- browse to `localhost:8080` to view the project.

### TODO:
- implement test suite
- optimize code. remove duplicate code.
- secure the api end points.
- code commenting.
- make the app responsive
- make it more presentable. css
- react-virtualized lib is buggy need to replace with a better component for infinite scroll
- minification and jslint implementation
- may be wrap it in docker container

### Known issue
- infinite scroll is bit buggy
