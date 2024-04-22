import { component$ } from "@builder.io/qwik";
import Section from "../section";
import Contact from "./contact";
import SiteMap from "./site-map";

export default component$(() => {
  return (
    <footer class="bg-black text-white">
      <Section class="bg-black">
        <div class="mb-4 text-2xl font-medium max-md:text-center">{$localize`公共程式平臺`}</div>
        <div class="flex flex-col gap-10 md:flex-row-reverse md:justify-between">
          <SiteMap />
          <Contact />
        </div>
      </Section>
    </footer>
  );
});
