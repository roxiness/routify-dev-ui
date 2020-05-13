const fs = require('fs')

module.exports = function (path, meta) {
    const content = fs.existsSync(path) ? fs.readFileSync(path, 'utf-8') : ""
    const snippets = createMetaSnippets(meta)
    const strippedContent = metaStripper(content)
    const newContent = `${strippedContent}\n\n\n${snippets.join("\n")}`
    fs.writeFileSync(path, newContent, 'utf-8')
}

function createMetaSnippets(meta) {
    return Object.entries(meta).map(([key, value]) => `<!-- routify:options ${key}=${JSON.stringify(value)} -->`)
}

function metaStripper(content) {
    const meta = RegExp(/\<\!\-\- *routify:options +((.|[\r\n])+?) *\-\-\>/, 'g')
    const breaks = /^\s+|\s+$/g
    return content.replace(meta, '').replace(breaks, '')
}

