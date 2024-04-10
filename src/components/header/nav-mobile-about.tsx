import { component$, useSignal } from "@builder.io/qwik";
import Link from "../link";

export default component$(() => {
  const menu = useSignal(false);

  return (
    <div class="-mx-3">
      <button
        type="button"
        class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-gray-900 hover:bg-gray-50"
        aria-controls="disclosure-about"
        aria-expanded="false"
        onClick$={() => {
          menu.value = !menu.value;
        }}
      >
        <span>{$localize`關於公共程式`}</span>
        <svg
          class="h-5 w-5 flex-none"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div
        class={["mt-2 space-y-2", { hidden: !menu.value }]}
        id="disclosure-about"
      >
        <Link
          href="/about"
          class="block rounded-lg py-2 pl-6 pr-3 text-gray-900 hover:bg-gray-50"
        >
          <span>{$localize`認識公共程式`}</span>
        </Link>
        <Link
          href="/future-plan"
          class="block rounded-lg py-2 pl-6 pr-3 text-gray-900 hover:bg-gray-50"
        >
          <span>{$localize`未來規劃`}</span>
        </Link>
      </div>
    </div>
  );
});
