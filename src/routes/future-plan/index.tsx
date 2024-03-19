import { component$ } from "@builder.io/qwik";
import Section from "~/components/Layout/Section";
import Breadcrumb from "~/components/breadcrumb";
import PromotionSection from "~/components/PromotionSection";
import FuturePlatform from "~/media/images/future-platform.svg?jsx";
import FutureLaw from "~/media/images/future-law.svg?jsx";
import FutureTalent from "~/media/images/future-talent.svg?jsx";

export default component$(() => {
  const features = [
    {
      img: FuturePlatform,
      title: $localize`集中便利的資訊系統平台`,
      description: $localize`為了方便查詢與使用，無論是來自數位發展部的示範案例，還是政府內各個機關開放的公共程式，甚至國外提供開放的資訊服務程式碼，都將儲存收整在單一窗口，即公共程式平臺（code.gov.tw）。所有政策公告也將一致在此發佈，讓民間或政府需要了解或使用公共程式的人，易於了解。`,
    },
    {
      img: FutureLaw,
      title: $localize`建置相關法律與規範`,
      description: $localize`針對現行制度導入公共程式的可操作性，將進行法規調適，包括對齊公共程式政策與相關法規之歧異，提供政府機關實務推動之法理依循。另外也將完備行政院及所屬機關（構）公共程式參考指引，包括公務機關辦理公共程式業務之規劃、採購、管理、資通安全防護等指南。`,
    },
    {
      img: FutureTalent,
      title: $localize`打造人才培育現場`,
      description: $localize`執行公民科技試驗場域專案，鼓勵民間有意投入的專業協作者，在此參與公共程式之研發、創建、維護和營運。另外將推動公共程式推動培力方案：辦理政府採購試辦案、公共程式研發企業獎助和公務機關培訓課程，並研擬專業協作者的回饋機制。`,
    },
  ];
  const roadmap = [
    {
      date: "2024/03",
      content: $localize`code.gov.tw 正式上線，並預計持續調整網頁功能，以趨近網站使用者的需求。`,
    },
    {
      date: "2024/09",
      content: $localize`我國政府軟體建置與開放原始碼現況報告`,
    },
    {
      date: "2024/10",
      content: $localize`113 年公民科技試驗場域成果發布，提供更多示範公共程式`,
    },
    {
      date: "2024/12",
      content: $localize`公共程式指引發布，提供公共程式標案之指南`,
    },
    {
      date: "2025/01",
      content: $localize`公共程式系列培訓課程制定`,
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
                  href: "future-plan",
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
              {$localize`公共程式不單是一種概念，更是即將發生的日常。在評估現行制度與深入研析各國實施公共程式的細節後，我們循序漸進提出逐步完善的政策與資源。此刻的起步看似緩慢，但藉由便利的資訊平台、完備的法律與規範、適切的試行試辦，公共程式將依次扎根在各層機關，長出支點，舉起台灣前所未有的數位實力。`}
            </p>
          </div>
          <div class="mt-8 flex flex-col gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                class="rounded-lg border border-gray-400 p-8"
              >
                <div class="flex flex-col items-center gap-8 md:flex-row">
                  <feature.img class="mx-auto h-40 w-40 shrink-0" />
                  <div class="flex flex-col">
                    <h4 class="text-center md:text-left">{feature.title}</h4>
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
      <PromotionSection />
    </>
  );
});
