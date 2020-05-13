<script>
  import { writable } from "svelte/store";
  import { setContext } from "svelte";
  import { route } from "@sveltech/routify";
  import { options } from "./api";
  import Tree from "./components/tree/Tree.svelte";
  import File from "./components/file/File.svelte";
  import Header from "./components/Header.svelte";
  import "./components/style";
  import Logo from "./components/logo.svelte";
  export let tree, port;
  $options.port = port;
  const treeStore = writable(tree);
  setContext("treeStore", treeStore);
</script>

<style>
  .routify {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99999;
  }
  .content {
    background: white;
    box-shadow: 0 0 10px rgba(127, 127, 127, 0.5);
  }
  .main {
    display: flex;
  }
  .tree,
  .file {
    overflow-y: auto;
    max-height: 600px;
    padding-right: 24px;
  }
  .file {
    min-width: 600px;
    width: auto;
    flex: auto;
  }

  * :global(.decorationsOverviewRuler) {
    display: none;
  }
</style>

{#if $route}
  <div class="routify" id="__routify-helper">
    <div on:click={() => ($options.showHelper = !$options.showHelper)}>
      <Logo />
    </div>

    {#if $options.showHelper}
      <div class="content">
        <div style="width: 100%; display: flex;">
          <Header />
        </div>
        <div class="main">
          <div class="tree">
            <Tree tree={$treeStore} />
          </div>
          {#if $options.showFile}
            <div class="file">
              <File />
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
{/if}
