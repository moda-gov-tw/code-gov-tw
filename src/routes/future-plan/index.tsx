import { component$ } from "@builder.io/qwik";
import Section from "~/components/section";
import Breadcrumb from "~/components/breadcrumb";
import Promotion from "~/components/promotion";
import FuturePlatform from "~/media/images/future-platform.png?jsx";
import FutureLaw from "~/media/images/future-law.png?jsx";
import FutureTalent from "~/media/images/future-talent.png?jsx";

export default component$(() => {
  const features = [
    {
      image: FuturePlatform,
      imageAlt: "Future Platform",
      title: $localize`方便查找的公共程式`,
      description: $localize`為了方便查詢與使用，無論是來自數位發展部的示範案例，還是政府內各個機關開放的公共程式，甚至國外提供開放的資訊服務程式碼，都將儲存收整在單一窗口，即公共程式平臺（code.gov.tw）。所有政策公告也將一致在此發佈，讓民間或政府需要了解或使用公共程式的人，易於了解。`,
    },
    {
      image: FutureLaw,
      imageAlt: "Future Law",
      title: $localize`建置相關規範與指引`,
      description: $localize`調適規範與指引，讓現行制度更容易導入公共程式，包括減少公共程式政策與相關法規的歧異，提供政府機關實務推動的依據。另外也將完備行政院及所屬機關（構）公共程式參考指引，包括公務機關辦理公共程式業務的規劃、採購、管理、資通安全防護等指南。`,
    },
    {
      image: FutureTalent,
      imageAlt: "Future Talent",
      title: $localize`打造人才培育環境`,
      description: $localize`透過教育訓練與宣導推廣，鼓勵民間有意投入者，在此參與公共程式的開發、維護和營運。另外將推動公共程式培力方案：包含試辦政府採購案、獎助公共程式研發和開辦培訓課程，並研擬回饋機制。`,
    },
  ];
  const roadmap = [
    {
      date: "2024/04",
      content: $localize`code.gov.tw 正式上線，並預計持續調整網頁功能，以更符合網站使用者的需求`,
    },
    {
      date: "2024/09",
      content: $localize`發布我國政府軟體建置與開放原始碼現況報告`,
    },
    {
      date: "2024/10",
      content: $localize`發布 113 年公民科技試驗場域成果，提供更多示範公共程式`,
    },
    {
      date: "2024/12",
      content: $localize`發布公共程式指引，以提供公共程式標案指南`,
    },
  ];

  return (
    <>
      <Section>
        <div class="flex flex-col gap-10 md:gap-16 lg:gap-20">
          <div>
            <Breadcrumb
              pages={[
                {
                  title: $localize`關於公共程式`,
                  href: "/future-plan",
                },
              ]}
            />
            <h1 class="text-primary">{$localize`未來規劃`}</h1>
          </div>
        </div>
      </Section>
      <Section>
        <div class="flex flex-col">
          <div class="flex flex-col">
            <div class="h-0 w-20 border-t-2 border-primary" />
            <h2 class="mt-4">{$localize`始於此，但不只如此`}</h2>
            <p class="mt-8">
              {$localize`公共程式不單是一種概念，更是即將發生的日常。在評估現行制度與深入研析各國實施公共程式的細節後，我們循序漸進提出逐步完善的政策與資源。此刻的起步看似緩慢，但藉由便利的資訊平臺、完備的規範與指引、適切的試行試辦，公共程式將依次扎根在各層機關，長出支點，舉起臺灣前所未有的數位實力。`}
            </p>
          </div>
          <div class="mt-8 flex flex-col gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                class="rounded-lg border border-gray-400 p-8"
              >
                <div class="flex flex-col items-center gap-8 md:flex-row">
                  <feature.image class="h-36 w-36" alt={feature.imageAlt} />
                  <div class="flex flex-col">
                    <h3 class="text-center md:text-left">{feature.title}</h3>
                    <p class="pt-4">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section class="bg-gray-100">
        <div class="flex flex-col">
          <div class="h-0 w-20 border-t-2 border-primary" />
          <h2 class="mt-4">{$localize`近期時程規劃`}</h2>
          <div class="mt-8">
            {roadmap.map((item) => (
              <div
                key={item.date}
                class="flex flex-col border-t border-gray-400 py-4 last-of-type:border-b md:flex-row"
              >
                <div class="w-40 font-medium">{item.date}</div>
                <div>{item.content}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Promotion />
    </>
  );
});
