<script lang="ts" setup>
import { defineComponent, h, markRaw } from "vue";
import LandingPageHero from "@/assets/svgs/landing-page-hero.svg";
import LandingPageScreenshot from "@/assets/landinpage-screenshot.jpg";
import { Popover } from "@headlessui/vue";
import {
  CogIcon,
  LightningBoltIcon,
  ArrowsExpandIcon,
  ChartBarIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "@heroicons/vue/outline";
import Discord from "@/assets/svgs/discord-brands.svg";
import { ExternalLinkIcon } from "@heroicons/vue/solid";
import Logo from "@/components/Logo.vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const features = [
  {
    name: "Jobs on demand",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi vitae lobortis.",
    icon: ServerIcon,
  },
  {
    name: "Ligthning fast",
    description:
      "Qui aut temporibus nesciunt vitae dicta repellat sit dolores pariatur. Temporibus qui illum aut.",
    icon: LightningBoltIcon,
  },
  {
    name: "Multichain support",
    description:
      "Qui aut temporibus nesciunt vitae dicta repellat sit dolores pariatur. Temporibus qui illum aut",
    icon: ArrowsExpandIcon,
  },
  {
    name: "Advanced Security",
    description:
      "Ullam laboriosam est voluptatem maxime ut mollitia commodi. Et dignissimos suscipit perspiciatis.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Powerful Customization",
    description:
      "Ab a facere voluptatem in quia corrupti veritatis aliquam. Veritatis labore quaerat ipsum quaerat id.",
    icon: CogIcon,
  },
  {
    name: "Monitoring",
    description:
      "Quia qui et est officia cupiditate qui consectetur. Ratione similique et impedit ea ipsum et.",
    icon: ChartBarIcon,
  },
];

const footerNavigation = {
  social: [
    {
      name: "Discord",
      href: "#",
      icon: markRaw(Discord as {}),
    },
    {
      name: "GitHub",
      href: "#",
      icon: defineComponent({
        render: () =>
          h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              "fill-rule": "evenodd",
              d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
              "clip-rule": "evenodd",
            }),
          ]),
      }),
    },
  ],
};
</script>

<template>
  <div class="bg-white">
    <div class="relative overflow-hidden">
      <Popover as="header" class="relative">
        <div class="bg-gray-900 pt-6">
          <nav
            class="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
            aria-label="Global"
          >
            <Logo mode="white" class="text-white h-14" />
          </nav>
        </div>
      </Popover>
      <main>
        <div
          class="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 pb-24 lg:pb-14 lg:overflow-hidden"
        >
          <div class="mx-auto max-w-7xl lg:px-8">
            <div class="lg:grid lg:grid-cols-2 lg:gap-8">
              <div
                class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center"
              >
                <div class="lg:py-24">
                  <h1
                    class="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl"
                  >
                    <span class="block">A better way to</span>
                    <span
                      class="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400 sm:pb-5"
                      >handle Chainlink</span
                    >
                  </h1>
                  <p
                    class="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl"
                  >
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam
                    occaecat fugiat.
                  </p>

                  <div
                    class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                  >
                    <div class="rounded-md shadow">
                      <button
                        @click="userStore.login()"
                        class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      >
                        Try it out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                <div
                  class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0 h-full"
                >
                  <LandingPageHero
                    class="w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature section with screenshot -->
        <div class="relative bg-gray-50 pt-16 sm:pt-24 lg:pt-32">
          <div
            class="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl"
          >
            <div>
              <h2
                class="text-base font-bold tracking-wider text-blue-600 uppercase"
              >
                Nodeless
              </h2>
              <p
                class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl"
              >
                No Chainlink node? No problem.
              </p>
              <p class="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                Phasellus lorem quam molestie id quisque diam aenean nulla in.
                Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
                condimentum id viverra nulla.
              </p>
            </div>
            <div class="mt-12 -mb-10 sm:-mb-24 lg:-mb-80">
              <img
                class="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                :src="LandingPageScreenshot"
                alt="nodeops screenshot"
              />
            </div>
          </div>
        </div>

        <!-- Feature section with grid -->
        <div class="relative bg-white py-16 sm:py-24 lg:py-32">
          <div
            class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl"
          >
            <h2
              class="text-base font-semibold tracking-wider text-blue-600 uppercase"
            >
              Develop faster
            </h2>
            <p
              class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl"
            >
              Everything you need for you'r API on Chainlink
            </p>
            <p class="mt-5 max-w-prose mx-auto text-xl text-gray-500">
              Phasellus lorem quam molestie id quisque diam aenean nulla in.
              Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
              condimentum id viverra nulla.
            </p>
            <div class="mt-12">
              <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="feature in features"
                  :key="feature.name"
                  class="pt-6"
                >
                  <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div class="-mt-6">
                      <div>
                        <span
                          class="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md shadow-lg"
                        >
                          <component
                            :is="feature.icon"
                            class="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3
                        class="mt-8 text-lg font-medium text-gray-900 tracking-tight"
                      >
                        {{ feature.name }}
                      </h3>
                      <p class="mt-5 text-base text-gray-500">
                        {{ feature.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="relative bg-gray-900">
          <div
            class="relative h-56 bg-blue-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2"
          >
            <img
              class="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&sat=-100"
              alt=""
            />
            <div
              aria-hidden="true"
              class="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 mix-blend-multiply"
            />
          </div>
          <div
            class="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32"
          >
            <div class="md:ml-auto md:w-1/2 md:pl-10">
              <h2
                class="text-base font-semibold uppercase tracking-wider text-gray-300"
              >
                Join our community
              </h2>
              <p
                class="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl"
              >
                We’re here to help
              </p>
              <p class="mt-3 text-lg text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
                egestas tempus tellus etiam sed. Quam a scelerisque amet
                ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
                quisque ut interdum tincidunt duis.
              </p>
              <div class="mt-8">
                <div class="inline-flex rounded-md shadow">
                  <a
                    href="#"
                    class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
                  >
                    Join our Discord
                    <ExternalLinkIcon
                      class="-mr-1 ml-3 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer class="bg-gray-50">
        <div
          class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8"
        >
          <nav
            class="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          ></nav>
          <div class="mt-8 flex justify-center space-x-6">
            <a
              v-for="item in footerNavigation.social"
              :key="item.name"
              :href="item.href"
              class="text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">{{ item.name }}</span>
              <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          <p class="mt-8 text-center text-base text-gray-400">
            &copy; 2022 nodeops, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>
