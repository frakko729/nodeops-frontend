<script lang="ts">
import Prism from "prismjs";
import "vue-code-highlight/themes/window.css";
</script>

<script setup lang="ts">
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import { ref, watch } from "vue";

interface Props {
  input?: string;
}

const { input } = defineProps<Props>();

const renderId = ref(1); // force re render, some prism bullshit

watch(
  () => input,
  () => {
    renderId.value++;
  }
);

const headers = `HTTP/1.1 200 OK
Host: localhost
Date: Thu, 05 May 2022 10:38:29 GMT
Connection: close
X-Powered-By: PHP/8.1.5
Cache-Control: no-cache, private
Date: Thu, 05 May 2022 10:38:29 GMT
Content-Type: application/json
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 56
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
Access-Control-Allow-Credentials: true

`;

const json = {
  id: 1,
  chain_id: "0x1",
  name: "Ethereum Mainnet",
  image: "chains/ethereum-logo.svg",
  is_mainnet: 1,
  is_active: 0,
  sort_order: 1,
  created_at: "2022-04-28T09:48:16.000000Z",
  updated_at: "2022-04-28T09:48:16.000000Z",
};

const string = JSON.stringify(json, null, 4);
</script>

<template>
  <div :key="renderId">
    <code-highlight language="javascript" v-if="input">
      <pre>{{ JSON.stringify(JSON.parse(input), null, 4) }}</pre>
    </code-highlight>
    <code-highlight language="javascript" v-else>
      <pre
        >{{ headers }}{{ string }}
    </pre
      >
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
