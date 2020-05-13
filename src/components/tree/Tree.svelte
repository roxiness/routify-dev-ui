<script>
  import { setContext } from "svelte";
  import Dir from "./Dir.svelte";
  import File from "./File.svelte";
  export let tree;

  setContext("treeCmps", { File, Dir });
</script>

{#if tree}
  <Dir node={tree} />
{/if}
