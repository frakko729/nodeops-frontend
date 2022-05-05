<script setup lang="ts">
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
</script>

<template>
  <div class="bg-white">
    <div
      class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
    >
      <pre class="p-4 whitespace-pre-wrap">
      Header:
        {{ headers }}

        Response:
        {{ json }}
      </pre>
    </div>
  </div>
</template>
