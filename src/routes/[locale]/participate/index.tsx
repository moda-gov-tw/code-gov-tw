import Participate from "../../participate";
import { type StaticGenerateHandler } from "@builder.io/qwik-city";

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: [{ locale: "en", param: "participate" }],
  };
};

export default Participate;
