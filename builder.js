/* eslint-disable */
var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    name: "automatic",
    files: './dist/**', // use the glob format
    platforms: ['osx64', 'win64', 'win32'],
    version: '0.24.4',
    buildDir: './buildNW'
});

//Log stuff you want

nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});
