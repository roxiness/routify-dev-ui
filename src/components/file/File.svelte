<script>
  import { route } from "@roxi/routify";
  import { tree, routes } from "../../api";
  import Input from "./Input.svelte";
  import AddMeta from "./AddMeta.svelte";

  let metaName = "";

  $: file = $route;
  $: ownMeta = file && file.ownMeta;
  $: meta = file && file.meta;

  let userInputs = [];
  let inheritedInputs = [];
  
  function setInputs(){
    userInputs = clone(Object.entries(ownMeta || {})).map(toObj)
    inheritedInputs = clone(Object.entries(meta || {}))
      .filter(([inhKey]) => !userInputs.find(({ name }) => inhKey === name))
      .map(toObj)
  }

  $: if(ownMeta) setInputs()

  function toObj([name, value]) {
    return { name, value };
  }

  function clone(obj){return JSON.parse(JSON.stringify(obj))}
</script>

<style>
  section {
    margin-bottom: 32px;
    padding: 0 32px;
  }
</style>

{#if meta}
  <AddMeta bind:userInputs />
  <section>
    <h1>{file.api.title}</h1>
    <div>
      <span>{file.filepath}</span>
    </div>
  </section>
  <section>
    <form action="">
      <fieldset>
        <legend>Entries</legend>

        <Input
          name="title"
          bind:value={ownMeta.title}
          placeholder={file.api.title} />

        {#each userInputs as { name, value }}
          <Input {name} bind:value />
        {/each}

        {#each inheritedInputs as { name, value }}
          <Input {name} bind:value />
        {/each}
      </fieldset>
    </form>
  </section>
{/if}
