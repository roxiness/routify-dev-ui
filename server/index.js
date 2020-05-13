const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileWriter = require('./filewriter')
const fs = require('fs-extra')

module.exports = function (options) {
    const { port } = options
    
    const app = express()
    app.use(cors())
    app.use(bodyParser.json());

    app.post('/movefile', (req, res) => {
        const { source, target } = req.body
        fs.moveSync(source, target)
        res.send('moved file')
        res.end()
    })

    app.post('/writefile', async (req, res) => {
        const { path, meta } = req.body
        await fileWriter(path, meta)
        res.json({ 'status': 'success' })
        res.end()
    })

    app.get('*', (req, res) => {
        console.log('hello there')
        res.send('try /writefile or /movefile')
    })

    app.listen(port)
    console.log('routify-helper listening on port', port)
}