import { type StaticGenerateHandler } from "@builder.io/qwik-city";
import Index from "~/routes";

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: [{ locale: "en" }],
  };
};

export default Index;
