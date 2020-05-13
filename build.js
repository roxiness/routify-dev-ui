const fs = require('fs')
const svelte = require('svelte/compiler')
const Helper = fs.readFileSync('./src/Helper.svelte', 'utf8')

const result = svelte.compile(Helper)

console.log(result.js)

fs.writeFileSync('dist/build/bundle.js', result.js.code, 'utf8')
fs.writeFileSync('dist/build/bundle.js.map', result.js.map, 'utf8')