<script context="module">
  import { writable } from "svelte/store";
  let ready = writable(false);
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src =
    "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.19.2/min/vs/loader.min.js";
  s.crossOrigin = true;
  s.onload = setEnvironment;
  document.getElementsByTagName("head")[0].append(s);

  function setEnvironment() {
    require.config({
      paths: {
        vs:
          "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.19.2/min/vs",
      },
    });

    window.MonacoEnvironment = {
      getWorkerUrl: function (workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.19.2/min'
        };
        importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.19.2/min/vs/base/worker/workerMain.js');`)}`;
      },
    };
    ready.set(true);
  }
</script>

<script>
  export let value = "";
  function attachEditor(e) {
    require(["vs/editor/editor.main"], function () {
      let editor = monaco.editor.create(e, {
        value: JSON.stringify(value, null, 2),
        overviewRulerBorder: false,
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        renderLineHighlight: false,
        language: "json",
        lineNumbers: "off",
        lineHeight: 18,
        fontSize: 16,
        fontWeight: 1,
        scrollbar: {
          alwaysConsumeMouseWheel: false,
          vertical: "hidden",
        },
        formatOnType: true,
        scrollBeyondLastLine: false,
        folding: false,
        minimap: {
          enabled: false,
        },
      });
      
    editor.onDidChangeModelContent((e,b)=>{
      value = editor.getValue()      
    })

      editor.onDidChangeModelDecorations(() => {
        updateEditorHeight(); // typing
        requestAnimationFrame(updateEditorHeight); // folding
      });
      let prevHeight = 0;
      updateEditorHeight();
      function updateEditorHeight() {
        const editorElement = editor.getDomNode();
        if (!editorElement) {
          return;
        }
        const lineHeight = editor.getOption(12);
        const lineCount =
          (editor.getModel() && editor.getModel().getLineCount()) || 1;
        const height = editor.getTopForLineNumber(lineCount + 1) + lineHeight;
        if (prevHeight !== height) {
          prevHeight = height;
          e.style.height = `${height + 28}px`;
          editor.layout();
        }
      }
    });
  }
</script>

{#if $ready}
  <div use:attachEditor style="width:auto" />
{/if}
