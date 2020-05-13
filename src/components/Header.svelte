<script>
  import { options } from "../api";
  
</script>

<label>
  <input type="checkbox" bind:checked={$options.showIndex} />
  index
</label>
<label>
  <input type="checkbox" bind:checked={$options.showTree} />
  tree
</label>
<label>
  <input type="checkbox" bind:checked={$options.showFile} />
  file
</label>