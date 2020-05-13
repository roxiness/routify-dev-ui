<script>
  import JsonBox from "./JsonBox.svelte";
  export let value = "";
  export let name;
  export let placeholder = "";

  const configs = {
    title: { type: "string" },
    index: { type: "string" },
    preload: { type: "boolean" },
    bundle: { type: "boolean" },
    "precache-order": { type: "ignore" },
    "precache-proximity": { type: "ignore" },
    recursive: { type: "ignore" },
  };
  $: config = configs[name] || {};
  $: type = config.type || "json";
</script>

<style>
  * :global() {
    --bg-color: #f5f5f5;
  }
  input {
    background: var(--bg-color);
    border: none;
    padding: 4px 8px;
    border-radius: 2px;
    height: 48px;
  }
  .json {
    background: var(--bg-color);
    padding: 12px 8px 0 0;
    border-radius: 2px;
  }
  * :global(.monaco-editor, .monaco-editor-background, .monaco-editor .inputarea.ime-input, .monaco-editor .margin) {
    background-color: var(--bg-color) !important;
  }
  h5 {
    font-weight: bold;
    padding-top: 18px;
    height: 48px;
    display: block;
  }
</style>

<div style="">
  <h5>{name}</h5>
  <!-- {JSON.stringify(value)} -->
  {#if type === 'json'}
    <div class="json">
      <JsonBox {name} bind:value />
      
    </div>
  {:else if type === 'boolean'}
    <input type="checkbox" bind:value />
  {:else}
    <input type="text" bind:value {placeholder} />
  {/if}
</div>
