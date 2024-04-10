import { component$, useSignal } from "@builder.io/qwik";
import Link from "~/components/link";
import NavAbout from "./nav-about";
import NavLanguage from "./nav-language";
import NavMobileAbout from "./nav-mobile-about";
import NavMobileLanguage from "./nav-mobile-language";
import Logo from "./logo.png?jsx";

export default component$(() => {
  const menu = useSignal(false);

  return (
    <header class="mx-auto max-w-7xl bg-white">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <Link href="/" class="-m-1.5 flex flex-row p-1.5">
            <Logo class="h-8 w-auto" alt="logo" />
            <div>
              <div class="pl-2 font-medium leading-4">公共程式平臺</div>
              <div class="pl-2 leading-4">code.gov.tw</div>
            </div>
          </Link>
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black hover:bg-gray-100"
            onClick$={() => (menu.value = true)}
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <NavAbout />
          <Link href="/projects" class="rounded-md px-3 py-2 hover:bg-gray-100">
            <span>{$localize`公共程式一覽`}</span>
          </Link>
          <NavLanguage />
        </div>
      </nav>
      <div class={["lg:hidden", { hidden: menu.value === false }]}>
        <div class="fixed inset-0 z-10" />
        <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <div>
              <Link href="/" class="-m-1.5 flex flex-row p-1.5 sm:hidden">
                <Logo class="h-8 w-auto" alt="logo" />
                <div>
                  <div class="pl-2 font-medium leading-4">公共程式平臺</div>
                  <div class="pl-2 leading-4">code.gov.tw</div>
                </div>
              </Link>
            </div>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick$={() => (menu.value = false)}
            >
              <span class="sr-only">Close menu</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <NavMobileAbout />
                <Link
                  href="/projects"
                  class="-mx-3 block rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-50"
                >
                  <span>{$localize`公共程式一覽`}</span>
                </Link>
              </div>
              <div class="py-6">
                <NavMobileLanguage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
