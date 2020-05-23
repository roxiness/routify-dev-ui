const server = require('./server')

module.exports = function (middlewares) {
    middlewares.push({
        name: "routify-helper",
        middleware
    })
    return middlewares
}


function middleware(payload) {
    if (!payload.options.singleBuild) {
        if (payload.state.firstBuild)
            server({ port: 13940 })

        attachTemplate(payload, 13940)
    }
}

function attachTemplate(payload, port) {
    console.log('ATTACHING TEMPLATE')
    payload.template += `    
import Helper from 'routify-dev-ui/src/Helper.svelte';
const oldHelper = document.getElementById('__routify-helper')
if (oldHelper) oldHelper.remove()
new Helper({
    target: document.body,
    props: {tree, routes, port: ${port}}
});
`
}