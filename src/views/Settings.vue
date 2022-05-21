<script setup lang="ts">
import Container from "@/components/Container.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import Tabs from "@/components/Tabs.vue";
import { useTabs } from "@/composables/tabs";
import { useUserStore } from "@/stores/userStore";
import { MailIcon } from "@heroicons/vue/solid";
import { ref } from "vue";

const { tabs, activeTab } = useTabs([
  { name: "General", current: true },
  { name: "Notifications", current: false },
]);

const userStore = useUserStore();
const emailModel = ref(userStore.email);

const onProfileSubmit = async () => {
  if (emailModel.value) {
    await userStore.updateEmail(emailModel.value);
  }
};
</script>

<template>
  <Container>
    <!-- Header -->
    <SectionHeader title="Settings" />

    <!-- Tabs -->
    <Tabs v-model="tabs">
      <div class="bg-white rounded-md shadow">
        <!-- Tab General -->
        <div v-if="activeTab?.name === 'General'">
          <FormKit
            type="form"
            :actions="false"
            @submit="onProfileSubmit"
            #default="{ state: { valid } }"
          >
            <div class="p-4 sm:p-6 space-y-1">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h3>
              <p class="max-w-2xl text-sm text-gray-500">
                This information will be used for contacting you.
              </p>
            </div>

            <div class="px-4 sm:px-6 max-w-2xl pb-8">
              <div>
                <div class="relative h-[42px]">
                  <div
                    class="absolute left-0 pl-3 flex items-center pointer-events-none mt-[34px]"
                  >
                    <MailIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <FormKit
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    v-model="emailModel"
                    input-class="pl-10"
                    validation="required|email"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </div>
            <div
              class="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-8 sm:mt-10 rounded-b-md"
            >
              <button
                :disabled="!valid"
                type="submit"
                class="disabled:opacity-75 disabled:cursor-not-allowed inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </FormKit>
        </div>
        <!-- Tab Notifications -->
        <div v-if="activeTab?.name === 'Notifications'">
          <div class="p-4 sm:p-6 space-y-1">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Notifications
            </h3>
            <p class="max-w-2xl text-sm text-gray-500">
              Decide which communications you'd like to receive and how.
            </p>
          </div>
          <div class="mt-6"></div>
        </div>
      </div>
    </Tabs>
  </Container>
</template>
