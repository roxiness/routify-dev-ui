<script>
  export let node;
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { getContext } from "svelte";

  const { File } = getContext("treeCmps");

  const [send, receive] = crossfade({});

  function sorter(a, b) {
    return a.ownMeta.index - b.ownMeta.index;
  }
  function filter(a) {
    return a.isPage || a.isDir;
  }
</script>

<style>
  li {
    list-style-type: none;
  }
  ul {
    padding-left: 18px;
  }
</style>

<ul class="folder">
  {#each node.children
    .filter(filter)
    .sort(sorter) as _node (_node.absolutePath)}
    <li
      class="file-container"
      animate:flip
      in:receive={{ key: _node.absolutePath }}
      out:send={{ key: _node.absolutePath }}>
      <File node={_node} dir={node} />
    </li>
  {/each}
</ul>
