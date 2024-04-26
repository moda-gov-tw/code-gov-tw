import { component$ } from "@builder.io/qwik";
import Section from "~/components/section";
import Breadcrumb from "~/components/breadcrumb";
import Promotion from "~/components/promotion";
import PublicCodeWork from "./public-code-work";
import Features from "./features";
import Accordions from "./accordions";
import AboutGlobal from "~/media/images/about-global.svg?jsx";

export default component$(() => {
  return (
    <>
      <Section>
        <Breadcrumb
          pages={[
            {
              title: $localize`關於公共程式`,
              href: "/about",
            },
          ]}
        />
        <h1 class="text-primary">{$localize`認識公共程式`}</h1>
        <div class="h2-sub mt-4">
          {$localize`讓資訊系統的開發變得更有效率，優良政府數位服務可以更簡單地發生`}
        </div>
      </Section>
      <Section>
        <PublicCodeWork />
      </Section>
      <Section>
        <div class="flex flex-col gap-8 xl:flex-row-reverse xl:items-center">
          <div class="mt-8 flex flex-col gap-4">
            <div>
              <div class="h-0 w-20 border-t-2 border-primary" />
              <h2 class="mt-4">{$localize`國際案例`}</h2>
            </div>
            <p>{$localize`歐洲自由軟體基金會（FSFE）在 2017 年提出了一項重要主張：認為政府所建置的系統應當完全公開，並提供清晰的指引和規範。此為「公共資金，公共程式」（public money, public code）運動。`}</p>
            <p>
              {$localize`而國際上著名的公共程式跨國案例為`}
              <a
                class="ml-1 underline"
                href="https://x-road.global/"
                target="_blank"
              >
                X-Road
              </a>
              {$localize`，由愛沙尼亞、芬蘭和冰島政府共同營運。除了各國政府能夠自由使用功能以外，例如在補助申請和駕照換發等功能，因為公共程式的特性，各國將都可以公開檢視與提供建議，並一旦發現問題，即可立即提出修正並將反饋納入系統中，並且讓所有單位同步更新。`}
            </p>
            <p>{$localize`除此之外，許多歐洲、北美和澳大利亞等國家也積極鼓勵將軟體開發成果以開源方式釋出，以促進公共程式的理念。`}</p>
          </div>
          <AboutGlobal class="lx:min-w-96 lx:my-auto mx-auto mt-8 shrink-0" />
        </div>
      </Section>
      <Section class="bg-gray-100">
        <Features />
      </Section>
      <Section>
        <Accordions />
      </Section>
      <Promotion />
    </>
  );
});
