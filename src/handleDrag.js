import { get } from 'svelte/store'
import { moveFile, writeFile } from './api'
import { getContext } from "svelte";

/**
 * @typedef {object} Node
 * @prop {string} path
 * @prop {Node} api
 * @prop {string} file
 * @prop {string} filepath
 * @prop {string} absolutePath
 * @prop {boolean} isDir
 * @prop {boolean} isPage
 * @prop {boolean} isFile
 * @prop {object} ownMeta
 * @prop {Node[]=} children
 * @prop {Node=} parent
 */

export const handleDrag = async function handleDrag(from, to, position) {
    const treeStore = getContext('treeStore')
    const Tree = get(treeStore)

    const oldFilePath = from.dataset.nodePath
    const dirPath = to.dataset.nodeDir
    const sibling = to.dataset.nodeFile

    const dirNode = getFile(Tree, dirPath)
    const fileNode = getFile(Tree, oldFilePath)
    const oldDest = fileNode.absolutePath
    fileNode.absolutePath = `${dirNode.absolutePath}/${fileNode.file}`

    // remove from old dir (even if not moved)
    const oldIndex = fileNode.parent.children.indexOf(fileNode)
    fileNode.parent.children.splice(oldIndex, 1)

    // insert node at new index position
    const children = dirNode.children.filter(filter).sort(sorter)
    const siblingIndex = children.findIndex(node => node.file === sibling) || 0
    const index = position === 'under' ? siblingIndex + 1 : siblingIndex
    children.splice(index, 0, fileNode)


    updateindexes(children)

    if (fileNode.absolutePath !== oldDest) {
        moveFile(oldDest, fileNode.absolutePath)
    }
    
    for (let node of children.filter(n => n.isPage || n.isDir)) {
        const suffix = node.isDir ? "/_layout.svelte" : ""
        await writeFile(node.absolutePath + suffix, node.ownMeta)
    }
    
    // insert in tree for animation effect
    dirNode.children.push(fileNode)
    treeStore.set(Tree)

    return true
}


/**
 * @param {Node} node 
 * @param {string} filepath 
 * @returns {Node}
 */
function getFile(node, filepath, state = {}) {
    state.node = state.node || (node.filepath === filepath) && node;
    (node.children || []).filter(n => n.isDir || n.isFile).forEach(_node => getFile(_node, filepath, state))
    return state.node
}


/** @param {Node[]} nodes */
function updateindexes(nodes) {
    let index = 100
    nodes.forEach(node => {
        console.log(node.path)
        if (node.ownMeta.index !== false) {
            node.ownMeta.index = index
            index = index + 100
        }
    })
}

function sorter(a, b) { return a.ownMeta.index - b.ownMeta.index }
function filter(a) { return a.isPage || a.isDir }