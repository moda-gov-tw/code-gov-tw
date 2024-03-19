import Submit from "../../submit";
import { type StaticGenerateHandler } from "@builder.io/qwik-city";

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: [{ locale: "en", param: "submit" }],
  };
};

export default Submit;
