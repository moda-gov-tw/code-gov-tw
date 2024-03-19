import { component$ } from "@builder.io/qwik";
import Section from "~/components/Layout/Section";
import ArrowRightIcon from "~/media/icons/arrow-right-icon.svg?jsx";
import Button from "~/components/button";

export default component$(() => {
  return (
    <Section class="bg-primary-800">
      <div class="flex flex-col">
        <div class="h-0 w-20 border-t-2 border-white" />
        <h2 class="mt-4 text-white">{$localize`公共程式一覽`}</h2>
        <h4 class="mt-8 text-white">
          {$localize`你知道現在已經有不少公共程式可以使用了嗎？我們期待其他機關能夠以它們為基礎做開發使用，達到程式開放共享的目的。公共程式就像是已經闢好的山路，讓旅者不用全程自己拓路，就算資源有限，也能爬到更高的山頂。`}
        </h4>
        <Button
          class="mt-8 w-fit border-0 text-secondary focus-visible:outline-secondary-600"
          href="/projects"
        >
          {$localize`查看公共程式一覽`}
          <ArrowRightIcon q:slot="icon-right" class="h-6 w-6"></ArrowRightIcon>
        </Button>
      </div>
    </Section>
  );
});
