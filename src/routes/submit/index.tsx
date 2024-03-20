import { component$ } from "@builder.io/qwik";
import Section from "~/components/section";
import Form from "./form";

export default component$(() => {
  return (
    <>
      <Section>
        <h1 class="text-primary">{$localize`提供公共程式`}</h1>
        <h3 class="mt-4">
          {$localize`公共程式是各政府機關分享開放的系統程式碼。若貴機關也有可露出於本平台的公共程式，歡迎填寫以下表單與我們聯絡。`}
        </h3>
      </Section>
      <Section>
        <div class="relative flex flex-col">
          <div class="h-0 w-20 border-t-2 border-primary" />
          <h2 class="mt-4">{$localize`填寫公共程式相關資訊`}</h2>
          <div class="mt-8">
            <Form />
          </div>
        </div>
      </Section>
    </>
  );
});
