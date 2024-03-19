import { component$ } from "@builder.io/qwik";
import Section from "~/components/Layout/Section";
import Breadcrumb from "~/components/breadcrumb";
import PromotionSection from "~/components/PromotionSection";
import PublicCodeWork from "./public-code-work";
import Features from "./features";
import Accordions from "./accordions";

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
        <h3 class="mt-4">
          {$localize`讓資訊系統的開發變得更有效率，優良政府數位服務可以更簡單地發生`}
        </h3>
      </Section>
      <Section>
        <PublicCodeWork />
      </Section>
      <Section class="bg-gray-100">
        <Features />
      </Section>
      <Section>
        <Accordions />
      </Section>
      <PromotionSection />
    </>
  );
});
