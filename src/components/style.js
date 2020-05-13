
const s = document.createElement("style");
s.textContent = getStylesheet();
document.head.append(s);

function getStylesheet() {
  return `
  #__routify-helper html {
    line-height: 1.15;
    /* 1 */
    -webkit-text-size-adjust: 100%;
    /* 2 */
  }
  #__routify-helper body {
    margin: 0;
  }
  #__routify-helper main {
    display: block;
  }
  #__routify-helper h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  #__routify-helper hr {
    box-sizing: content-box;
    /* 1 */
    height: 0;
    /* 1 */
    overflow: visible;
    /* 2 */
  }
  #__routify-helper pre {
    font-family: monospace, monospace;
    /* 1 */
    font-size: 1em;
    /* 2 */
  }
  #__routify-helper a {
    background-color: transparent;
  }
  #__routify-helper abbr[title] {
    border-bottom: none;
    /* 1 */
    text-decoration: underline;
    /* 2 */
    text-decoration: underline dotted;
    /* 2 */
  }
  #__routify-helper b,
  #__routify-helper strong {
    font-weight: bolder;
  }
  #__routify-helper code,
  #__routify-helper kbd,
  #__routify-helper samp {
    font-family: monospace, monospace;
    /* 1 */
    font-size: 1em;
    /* 2 */
  }
  #__routify-helper small {
    font-size: 80%;
  }
  #__routify-helper sub,
  #__routify-helper sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  #__routify-helper sub {
    bottom: -0.25em;
  }
  #__routify-helper sup {
    top: -0.5em;
  }
  #__routify-helper img {
    border-style: none;
  }
  #__routify-helper button,
  #__routify-helper input,
  #__routify-helper optgroup,
  #__routify-helper select,
  #__routify-helper textarea {
    font-family: inherit;
    /* 1 */
    font-size: 100%;
    /* 1 */
    line-height: 1.15;
    /* 1 */
    margin: 0;
    /* 2 */
  }
  #__routify-helper button,
  #__routify-helper input {
    /* 1 */
    overflow: visible;
  }
  #__routify-helper button,
  #__routify-helper select {
    /* 1 */
    text-transform: none;
  }
  #__routify-helper button,
  #__routify-helper [type=button],
  #__routify-helper [type=reset],
  #__routify-helper [type=submit] {
    -webkit-appearance: button;
  }
  #__routify-helper button::-moz-focus-inner,
  #__routify-helper [type=button]::-moz-focus-inner,
  #__routify-helper [type=reset]::-moz-focus-inner,
  #__routify-helper [type=submit]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  #__routify-helper button:-moz-focusring,
  #__routify-helper [type=button]:-moz-focusring,
  #__routify-helper [type=reset]:-moz-focusring,
  #__routify-helper [type=submit]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  #__routify-helper fieldset {
    padding: 0.35em 0.75em 0.625em;
  }
  #__routify-helper legend {
    box-sizing: border-box;
    /* 1 */
    color: inherit;
    /* 2 */
    display: table;
    /* 1 */
    max-width: 100%;
    /* 1 */
    padding: 0;
    /* 3 */
    white-space: normal;
    /* 1 */
  }
  #__routify-helper progress {
    vertical-align: baseline;
  }
  #__routify-helper textarea {
    overflow: auto;
  }
  #__routify-helper [type=checkbox],
  #__routify-helper [type=radio] {
    box-sizing: border-box;
    /* 1 */
    padding: 0;
    /* 2 */
  }
  #__routify-helper [type=number]::-webkit-inner-spin-button,
  #__routify-helper [type=number]::-webkit-outer-spin-button {
    height: auto;
  }
  #__routify-helper [type=search] {
    -webkit-appearance: textfield;
    /* 1 */
    outline-offset: -2px;
    /* 2 */
  }
  #__routify-helper [type=search]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  #__routify-helper ::-webkit-file-upload-button {
    -webkit-appearance: button;
    /* 1 */
    font: inherit;
    /* 2 */
  }
  #__routify-helper details {
    display: block;
  }
  #__routify-helper summary {
    display: list-item;
  }
  #__routify-helper template {
    display: none;
  }
  #__routify-helper [hidden] {
    display: none;
  }
  `;
}