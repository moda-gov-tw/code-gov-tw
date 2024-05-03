import { component$ } from "@builder.io/qwik";
import Section from "~/components/section";
import Promotion from "~/components/promotion";
import Button from "~/components/button";
import HeroSvg from "~/media/images/hero.png?jsx";
import WhatIsPublicCode from "~/media/images/index-what-is-public-code.png?jsx";
import InfoCardGOV from "~/media/images/index-info-card-gov.png?jsx";
import InfoCardPeople from "~/media/images/index-info-card-people.png?jsx";
import ECOSystem from "~/media/images/index-eco-system.png?jsx";
import ArrowRightIcon from "~/media/icons/arrow-right-icon.svg?jsx";

export default component$(() => {
  return (
    <>
      <Section>
        <div class="flex flex-col-reverse gap-8 lg:flex-row">
          <div class="flex flex-col lg:items-start lg:justify-center">
            <h1 class="text-center text-secondary">{$localize`取之公共，用之公共`}</h1>
            <p class="h1-sub mt-4 text-center">{$localize`集結眾人之力，提升政府數位服務品質`}</p>
            <p class="mt-8">
              {$localize`科技不斷進步，越來越多政府的服務都在網路上進行。如果政府機關之間可以分享各自在製作網站、打造 App 等數位服務時的成果，就可以帶來集體智慧的優勢。公共程式是一種能被不同政府機關間共用的電腦程式，它的透明共享將有機會連結地方與中央、政府與民間，集結眾人之力，釋放政府潛能。`}
            </p>
            <p class="mt-2">
              {$localize`因此，公共程式 (Public code) 是一種不可或缺的數位基礎建設，讓政府的數位環境邁向下個科技時代。`}
            </p>
          </div>
          <HeroSvg
            class="mx-auto lg:w-1/2 lg:shrink-0"
            alt="Public Code Platform"
          />
        </div>
      </Section>
      <Section>
        <div class="flex flex-col gap-8 md:gap-20">
          <div class="flex flex-col gap-8 rounded-lg bg-primary-800 px-6 py-10 text-white md:p-16 lg:flex-row-reverse">
            <WhatIsPublicCode
              class="mx-auto shrink-0 md:h-80 md:w-80"
              alt="What is Public Code?"
            />
            <div class="flex flex-col">
              <div class="h-0 w-20 border-t-2 border-white" />
              <h2 class="mt-4">{$localize`公共程式是什麼`}</h2>
              <p class="h2-sub mt-4">
                {$localize`公共程式是指將政府開發的網站或軟體系統，公開釋出，公眾共同使用和維護，因此被形容為公共的數位基礎建設。`}
              </p>
              <p class="mt-8">
                {$localize`想像政府購買了一份拼圖，這份拼圖代表一個網站或者軟體系統。而這張拼圖中的某些部分在未來可能可以再次使用，因為其他部門可能有類似的需求。但過去的開發方式，是重新再做很相似的拼圖，造成效率上的降低。而公共程式就是政府決定將這張拼圖的設計公開給其他部門或人民。這樣一來，其他部門可以輕鬆地拆下這張拼圖的一部分，然後將其用於他們自己的項目中，而不需要從頭開始創建。同時，如果原本的拼圖中有一些問題或者需要改進的地方，其他廠商或者人民也可以根據這個設計，重新製作出一個更好的版本。`}
              </p>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div class="flex flex-col items-center rounded-md border border-black p-6">
              <InfoCardGOV class="h-52 w-52" alt="Government agencies" />
              <h3 class="mt-4 whitespace-nowrap text-center text-primary-700 md:min-h-16">
                {$localize`我想進一步了解公共程式`}
              </h3>
              <Button class="mt-8 w-full" href="/about">
                {$localize`認識公共程式`}
                <ArrowRightIcon q:slot="icon-right" class="h-6 w-6" />
              </Button>
            </div>
            <div class="flex flex-col items-center rounded-md border border-black p-6">
              <InfoCardPeople class="h-52 w-52" alt="contributor" />
              <h3 class="mt-4 text-center text-primary-700">
                {$localize`我是有意願協作或給建議`}
              </h3>
              <h3 class="text-center text-primary-700">
                {$localize`想知道可以怎麼參與`}
              </h3>
              <Button class="mt-8 w-full" href="/participate">
                {$localize`了解參與方式`}
                <ArrowRightIcon q:slot="icon-right" class="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <Section class="bg-gray-100">
        <div class="flex flex-col gap-8 lg:flex-row lg:gap-20">
          <div class="flex flex-col gap-8 lg:justify-center">
            <div class="flex flex-col">
              <div class="h-0 w-20 border-t-2 border-primary" />
              <h2 class="mt-4">{$localize`架建適合公共程式發展的環境`}</h2>
              <p class="h2-sub mt-4">{$localize`即將起步的公共程式生態系`}</p>
              <p class="mt-8">
                {$localize`當公共程式萌芽在政府機關中，會為現行政府數位服務的開發方式帶來改變。因此將從法規調整、人才培育、硬體建置等方面逐一到位，讓公共程式為政府帶來扎實茁壯的數位實力。`}
              </p>
            </div>
            <Button class="w-fit bg-white" href="/future-plan">
              {$localize`未來規劃`}
              <ArrowRightIcon q:slot="icon-right" class="h-6 w-6" />
            </Button>
          </div>
          <ECOSystem
            class="mx-auto md:w-4/6 lg:w-5/12 lg:shrink-0"
            alt="ECO System"
          />
        </div>
      </Section>
      <Promotion />
    </>
  );
});
