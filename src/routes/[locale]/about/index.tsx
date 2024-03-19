import { type StaticGenerateHandler } from "@builder.io/qwik-city";
import About from "~/routes/about";

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: [{ locale: "en", param: "about" }],
  };
};

export default About;
