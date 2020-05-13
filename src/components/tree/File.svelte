<script>
  import { getContext } from "svelte";
  import { draggedFile, state, options } from "../../api";
  import { goto, isActive } from "@sveltech/routify";

  import { handleDrag } from "../../handleDrag";

  export let node, dir;
  const { Dir } = getContext("treeCmps");

  const styles = ["dragged-over", "dragged-under", "dragged-in"];

  let draggedItem = null;
  let position = null;

  function dragover(e) {
    const { target, srcElement, toElement } = e;

    if (!target.dataset.nodeDir) return false;
    if ($draggedFile.dataset.nodeDir !== target.dataset.nodeDir) return false;

    e.stopPropagation();
    e.preventDefault();
    const y = e.clientY;
    const top = target.getBoundingClientRect().top;
    const height = target.getBoundingClientRect().height;
    const inTop = y < top + height / 2;

    position = inTop ? "over" : "under";

    target.classList.remove(...styles);
    if (inTop) target.classList.add("dragged-over");
    else target.classList.add("dragged-under");
  }
  function dragleave(ev) {
    ev.stopPropagation();
    ev.target.classList.remove(...styles);
  }
  function dragstart(e) {
    if (e.target.dataset.nodeIndex === "false") return false;
    $draggedFile = e.target;
    e.stopPropagation();
  }
  function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!e.target.dataset.nodeDir) return false;
    handleDrag($draggedFile, e.target, position);
    e.target.classList.remove(...styles);
  }
  function dragend() {
    $draggedFile = null;
  }
</script>

<style>
  :global(.files.dragging :not(.file)) {
    pointer-events: none;
  }
  .file {
    pointer-events: all;
    padding: 3px;
    color: #aaa;
    cursor: pointer;
  }
  .file.draggable {
    color: #333;
  }
  * :global(.dragged-over) {
    border-top: 3px solid black;
    padding-top: 0;
  }
  * :global(.dragged-under) {
    border-bottom: 3px solid black;
    padding-bottom: 0;
  }
  * :global(.dragged-in) {
    border: 3px solid black;
    padding: 0;
  }

  :global(.files .file-display .index) {
    display: none;
  }
  :global(.files.showIndex .file-display .index) {
    display: inline-block;
  }

  div.file .file-display {
    /* border: 1px solid red */
  }
</style>

<div
  class="file"
  class:draggable={node.ownMeta.index !== false}
  draggable="true"
  on:dragstart={dragstart}
  on:dragover={dragover}
  on:dragleave={dragleave}
  on:dragend={dragend}
  on:drop={drop}
  data-node={node}
  data-node-path={node.filepath}
  data-node-file={node.file}
  data-node-index={node.ownMeta.index}
  data-node-dir={dir.filepath}>

  <!-- <div class="file-display"> -->
  <div
    class="file-display"
    on:click={() => history.pushState({}, '', node.path)}>
    {#if $options.showIndex}
      <span class="index">{node.ownMeta.index}</span>
    {/if}
    {node.api.title || node.file}
  </div>
  {#if node.children && node.children.length}
    <Dir {node} />
  {/if}
</div>
