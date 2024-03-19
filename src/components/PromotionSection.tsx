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
        <p class="h2-sub mt-8 text-white">
          {$localize`你知道現在已經有公共程式可以使用了嗎？我們期待各界以它們為基礎進行開發，達到程式開放共享的目的。公共程式就像是已經闢好的山路，讓登山者不用全程自己開路，就算資源有限，也能夠爬到更高的山頂。`}
        </p>
        <Button
          class="mt-8 w-fit border-0 text-secondary focus-visible:outline-secondary-600"
          href="/projects"
        >
          {$localize`查看公共程式一覽`}
          <ArrowRightIcon q:slot="icon-right" class="h-6 w-6" />
        </Button>
      </div>
    </Section>
  );
});
