import { component$ } from "@builder.io/qwik";
import Feature1 from "~/media/images/about-feature-01.png?jsx";
import Feature2 from "~/media/images/about-feature-02.png?jsx";
import Feature3 from "~/media/images/about-feature-03.png?jsx";
import Feature4 from "~/media/images/about-feature-04.png?jsx";

export default component$(() => {
  const features = [
    {
      title: $localize`協助前期對焦`,
      title2: $localize`讓共識的形成更加快速`,
      description: $localize`公共程式為具體、已開發的資訊系統。各政府機關能以公共程式為討論基礎，有效統整需求，進而提出明確規格，提升與資訊廠商的溝通品質。`,
      image: Feature1,
      imageAlt: "Assistance with Initial Focusing",
    },
    {
      title: $localize`資源共享`,
      title2: $localize`善用已開發的資訊系統`,
      description: $localize`過去有共同需求的機關可以利用相同系統，減少重複開發的心力。 使用公共程式，透過共享前段開發成果，將精神集中在客製化該公共程式。`,
      image: Feature2,
      imageAlt: "Resource Sharing",
    },
    {
      title: $localize`公開釋出`,
      title2: $localize`信任來自理解與看見`,
      description: $localize`系統程式碼進行開放，資訊服務的品質即可被公開檢視。尤其當資訊服務牽涉到公眾利益，公共程式的透明將讓公眾理解系統如何運作，並因此帶來信任。`,
      image: Feature3,
      imageAlt: "Public Release",
    },
    {
      title: $localize`加速政府數位化`,
      title2: $localize`拓展政府數位服務範圍`,
      description: $localize`透過公共程式，提供不同資訊系統的示範，讓各政府機關獲得數位化公共服務的靈感，與廠商共創，促進更多優良資訊系統的架設。`,
      image: Feature4,
      imageAlt: "Accelerating Government Digitalization",
    },
  ];

  return (
    <div class="flex flex-col">
      <div class="h-0 w-20 border-t-2 border-primary" />
      <h2 class="mt-4">{$localize`公共程式的特色`}</h2>
      <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            class="flex flex-col gap-9 rounded-md border border-black bg-white p-10"
          >
            <div>
              <feature.image class="h-40 w-40" alt={feature.imageAlt} />
            </div>
            <div class="flex flex-col">
              <h3 class="mt-8">{feature.title}</h3>
              <h4 class="mt-4">{feature.title2}</h4>
              <p class="mt-8">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
