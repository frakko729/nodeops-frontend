<script lang="ts">
import Prism from "prismjs";
import "vue-code-highlight/themes/window.css";
import "prism-es6/components/prism-markup-templating";
import "prism-es6/components/prism-toml";
import "prismjs/components/prism-dot";
</script>

<script setup lang="ts">
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";

interface Props {
  input?: string;
}

const { input } = defineProps<Props>();

const toml = `type                = "directrequest"
schemaVersion       = 1
evmChainID          = 1
name                = "example eth request event spec"
contractAddress     = "0x613a38AC1659769640aaE063C651F48E0250454C"

# Optional fields:
# requesters        = [
#   "0xaaaa1F8ee20f5565510B84f9353F1E333E753B7a",
#   "0xbbbb70F0e81C6F3430dfdC9fa02fB22BdD818C4e"
# ]
# minContractPaymentLinkJuels = "100000000000000"
# externalJobID = "0EEC7E1D-D0D2-476C-A1A8-72DFB6633F02"

observationSource   = """
    ds          [type="http" method=GET url="http://example.com"]
    ds_parse    [type="jsonparse" path="USD"]
    ds_multiply [type="multiply" times=100]

    ds -> ds_parse -> ds_multiply
"""`;

const dot = `
    ds          [type="http" method=GET url="http://example.com"]
    ds_parse    [type="jsonparse" path="USD"]
    ds_multiply [type="multiply" times=100]

    ds -> ds_parse -> ds_multiply`;

const parsedDot = Prism.highlight(dot, Prism.languages.dot, "dot");
</script>

<template>
  <div>
    <code-highlight language="toml">
      <pre v-if="input">{{ input }}</pre>
      <pre v-else>{{ toml }}</pre>
    </code-highlight>
  </div>
</template>

<style>
div pre[class*="language-"] {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
code[class*="language-"],
pre[class*="language-"] {
  font-family: Hack, Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono",
    "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono",
    "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L",
    "Courier New", Courier, monospace;
  font-size: 14px;
  line-height: 1.375;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  background: #1d262f;
  @apply text-gray-200;
}

pre[class*="language-"]::-moz-selection,
pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection {
  text-shadow: none;
  background: #004a9e;
}

pre[class*="language-"]::selection,
pre[class*="language-"] ::selection,
code[class*="language-"]::selection,
code[class*="language-"] ::selection {
  text-shadow: none;
  background: #004a9e;
}

pre[class*="language-"] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
}

:not(pre) > code[class*="language-"] {
  padding: 0.1em;
  border-radius: 0.3em;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #57718e;
}

.token.punctuation {
  color: #57718e;
}

.token.namespace {
  opacity: 0.7;
}

.token.tag,
.token.operator,
.token.number {
  @apply text-blue-400;
}

.token.property,
.token.function {
  @apply text-green-400;
}

.token.tag-id,
.token.selector,
.token.atrule-id {
  color: #ebf4ff;
}

code.language-toml,
.token.attr-name {
  color: #7eb6f6;
}

code.language-dot,
.token.attr-name {
  color: #ffffff;
}

code.language-css,
code.language-scss,
.token.boolean,
.token.string,
.token.entity,
.token.url,
.language-css .token.string,
.language-scss .token.string,
.style .token.string,
.token.attr-value,
.token.keyword,
.token.control,
.token.directive,
.token.unit,
.token.statement,
.token.regex,
.token.atrule {
  @apply text-blue-300;
}

.token.placeholder,
.token.variable {
  color: #47ebb4;
}

.token.deleted {
  text-decoration: line-through;
}

.token.inserted {
  border-bottom: 1px dotted #ebf4ff;
  text-decoration: none;
}

.token.italic {
  font-style: italic;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.important {
  color: #7eb6f6;
}

.token.entity {
  cursor: help;
}

pre > code.highlight {
  outline: 0.4em solid #34659d;
  outline-offset: 0.4em;
}
.line-numbers .line-numbers-rows {
  border-right-color: #1f2932;
}

.line-numbers-rows > span:before {
  color: #2c3847;
}

.line-highlight {
  background: rgba(10, 163, 112, 0.2);
  background: -webkit-linear-gradient(
    left,
    rgba(10, 163, 112, 0.2) 70%,
    rgba(10, 163, 112, 0)
  );
  background: linear-gradient(
    to right,
    rgba(10, 163, 112, 0.2) 70%,
    rgba(10, 163, 112, 0)
  );
}
</style>
