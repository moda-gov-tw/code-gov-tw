import { component$ } from "@builder.io/qwik";
import Section from "../Layout/Section";
import Contact from "./contact";
import SiteMap from "./site-map";

export default component$(() => {
  return (
    <footer class="bg-black text-white">
      <Section class="bg-black">
        <h3 class="mb-4 max-md:text-center">{$localize`公共程式平臺`}</h3>
        <div class="flex flex-col gap-10 md:flex-row-reverse md:justify-between">
          <SiteMap />
          <Contact />
        </div>
      </Section>
    </footer>
  );
});
