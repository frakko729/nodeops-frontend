<script setup lang="ts">
import Prism from "prismjs";
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";

interface Props {
  input: string;
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
</script>

<template>
  <div>
    <code-highlight language="javascript">
      {{ input }}
    </code-highlight>
  </div>
</template>
