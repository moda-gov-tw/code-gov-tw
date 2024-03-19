import { component$ } from "@builder.io/qwik";
import Link from "~/components/link";

export default component$(() => {
  return (
    <div class="flex flex-col gap-10 md:flex-row">
      <div class="flex flex-col items-center">
        <h4 class="mb-5 border-b px-2 pb-3 md:pl-0">{$localize`關於公共程式`}</h4>
        <div class="flex flex-col items-center gap-1 md:w-full md:items-start">
          <Link href="/projects">
            <h4 class="hover:text-gray-300">{$localize`公共程式一覽`}</h4>
          </Link>
          <Link href="/about">
            <h4 class="hover:text-gray-300">{$localize`認識公共程式`}</h4>
          </Link>
          <Link href="/future-plan">
            <h4 class="hover:text-gray-300">{$localize`未來規劃`}</h4>
          </Link>
        </div>
      </div>

      <div class="flex flex-col items-center">
        <h4 class="mb-5 border-b px-2 pb-3 md:pl-0">{$localize`參與公共程式`}</h4>
        <div class="flex flex-col items-center gap-1 md:w-full md:items-start">
          <Link href="/submit">
            <h4 class="hover:text-gray-300">{$localize`提供公共程式`}</h4>
          </Link>
          <Link href="/participate">
            <h4 class="hover:text-gray-300">{$localize`民眾參與`}</h4>
          </Link>
        </div>
      </div>
    </div>
  );
});
