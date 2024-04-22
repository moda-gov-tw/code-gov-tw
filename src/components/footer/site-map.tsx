import { component$ } from "@builder.io/qwik";
import Link from "~/components/link";

export default component$(() => {
  return (
    <div class="mt-4 flex flex-col gap-10 md:-mt-12 md:flex-row">
      <div class="flex flex-col items-center">
        <div class="h2-sub mb-5 border-b px-2 pb-3 md:pl-0">{$localize`關於公共程式`}</div>
        <div class="flex flex-col items-center gap-4 md:w-full md:items-start">
          <Link href="/projects">
            <p class=" font-normal hover:text-gray-300">{$localize`公共程式一覽`}</p>
          </Link>
          <Link href="/about">
            <p class="hover:text-gray-300">{$localize`認識公共程式`}</p>
          </Link>
          <Link href="/future-plan">
            <p class="hover:text-gray-300">{$localize`未來規劃`}</p>
          </Link>
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="h2-sub mb-5 border-b px-2 pb-3 md:pl-0">{$localize`參與公共程式`}</div>
        <div class="flex flex-col items-center gap-4 md:w-full md:items-start">
          <Link class="hidden" href="/submit">
            <p class="hover:text-gray-300">{$localize`提供公共程式`}</p>
          </Link>
          <Link href="/participate">
            <p class="hover:text-gray-300">{$localize`如何參與`}</p>
          </Link>
        </div>
      </div>
    </div>
  );
});
