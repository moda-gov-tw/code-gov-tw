import { component$ } from "@builder.io/qwik";
import Link from "~/components/link";

export default component$(() => {
  return (
    <div class="flex flex-col gap-10 md:flex-row mt-4 md:-mt-12">
      <div class="flex flex-col items-center">
        <h4 class="mb-5 border-b px-2 pb-3 md:pl-0">{$localize`關於公共程式`}</h4>
        <div class="flex flex-col items-center gap-1 md:w-full md:items-start">
          <Link href="/projects">
            <p class="h2-sub hover:text-gray-300">{$localize`公共程式一覽`}</p>
          </Link>
          <Link href="/about">
            <p class="h2-sub hover:text-gray-300">{$localize`認識公共程式`}</p>
          </Link>
          <Link href="/future-plan">
            <p class="h2-sub hover:text-gray-300">{$localize`未來規劃`}</p>
          </Link>
        </div>
      </div>

      <div class="flex flex-col items-center">
        <h4 class="mb-5 border-b px-2 pb-3 md:pl-0">{$localize`參與公共程式`}</h4>
        <div class="flex flex-col items-center gap-1 md:w-full md:items-start">
          <Link class="hidden" href="/submit">
            <p class="h2-sub hover:text-gray-300">{$localize`提供公共程式`}</p>
          </Link>
          <Link href="/participate">
            <p class="h2-sub hover:text-gray-300">{$localize`民眾參與`}</p>
          </Link>
        </div>
      </div>
    </div>
  );
});
