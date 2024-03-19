import { component$ } from "@builder.io/qwik";
import Feature01 from "~/media/images/about-work-feature-01.svg?jsx";
import Feature02 from "~/media/images/about-work-feature-02.svg?jsx";
import Feature03 from "~/media/images/about-work-feature-03.svg?jsx";
import WorkAll from "~/media/images/about-work-all.svg?jsx";

export default component$(() => {
  const features = [
    {
      title: $localize`01 參考公共程式`,
      description: $localize`政府機關欲開發資訊服務時，可於公共程式一覽瀏覽公共程式，查看是否已存在類似功能的公共程式。`,
      image: Feature01,
    },
    {
      title: $localize`02 進行客製化`,
      description: $localize`與廠商合作，在既存的公共程式碼基礎上，進行實際需求的客製化開發。`,
      image: Feature02,
    },
    {
      title: $localize`03 分享開發成果`,
      description: $localize`開發完成後，確認授權方式，並再次開放公共程式。公共程式不僅能成為示範，再為其他機關沿用，亦可開放民間，讓公共再次回到公共。`,
      image: Feature03,
    },
  ];

  return (
    <div class="flex flex-col">
      <div class="h-0 w-20 border-t-2 border-primary" />
      <h2 class="mt-4">{$localize`公共程式的運作方式`}</h2>
      <div class="mt-8 flex flex-col-reverse gap-8 lg:flex-row">
        <div class="flex basis-1/3 flex-col gap-8">
          {features.map((feature) => (
            <div key={feature.title}>
              <div class="px-8 md:hidden">
                <feature.image class="mx-auto md:max-w-[335px]" />
              </div>
              <div class="flex flex-col rounded-lg bg-gray-300 p-6 max-md:items-center max-md:bg-transparent">
                <h4>{feature.title}</h4>
                <p class="mt-4">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <WorkAll class="mx-auto max-w-[756px] basis-2/3 max-md:hidden" />
      </div>
    </div>
  );
});
