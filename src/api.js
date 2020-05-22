import { writable, get } from 'svelte/store'

export const draggedFile = writable(null)
export const tree = writable(null)
export const routes = writable(null)
export const state = writable({
    currentNode: null,
    port: null
})

export function writeFile(path, meta) {
    postData('/writefile', { path, meta })
}

export function moveFile(source, target) {
    postData('/movefile', { source, target })
}

function postData(path, data) {
    fetch(`//localhost:${get(options).port}${path}`, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
}

const defaultOptions = {
    showHelper: true,
    showTree: true,
    showFile: false,
    showIndex: false,
    port: null,
    ...JSON.parse(localStorage.getItem('__routify-helper.options')) || {}
}

export const options = writable(defaultOptions)

options.subscribe(options => localStorage.setItem('__routify-helper.options', JSON.stringify(options)))



