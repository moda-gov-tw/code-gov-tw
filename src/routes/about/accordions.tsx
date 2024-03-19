import { component$ } from "@builder.io/qwik";
import Accordion from "./accordion";

export default component$(() => {
  const accordions = [
    {
      title: $localize`當系統的程式碼被開放檢視/使用，會不會有資安問題？`,
      description: $localize`公共程式只有開放系統架構，並不開放內涵資料。且因為可公開檢視，當系統有漏洞時，有更多人可以共同找尋問題，更可以防止系統開發時撰寫不正當之程式碼。`,
    },
    {
      title: $localize`使用公共程式與現在的資訊系統開發方式，有什麼不一樣？`,
      description: $localize`一般的資訊系統開發時，通常需從頭定義需求並開發。但使用公共程式時，可以奠基於已經定義過需求及開發完成的資訊系統，進行客製化使用。`,
    },
    {
      title: $localize`什麼樣的資訊廠商可以協助公共程式的客製化開發？`,
      description: $localize`因為是公開程式碼，所以任何廠商都可以接手做客製化與維護，開啟政府機關與更多不同廠商合作的可能性。`,
    },
    {
      title: $localize`對於沒有執行過公共程式開發標案的承辦或廠商，會不會提供相關協助？`,
      description: $localize`除了年底將發布的公共程式參考指引，針對不熟悉公共程式的機關承辦與廠商，也將開設培力課程。`,
    },
  ];

  return (
    <div class="flex flex-col">
      <div class="h-0 w-20 border-t-2 border-primary" />
      <h2 class="mt-4">{$localize`常見問答`}</h2>
      <div class="mt-8 flex flex-col gap-8">
        {accordions.map((accordion, index) => (
          <Accordion
            key={index}
            title={accordion.title}
            description={accordion.description}
          />
        ))}
      </div>
    </div>
  );
});
