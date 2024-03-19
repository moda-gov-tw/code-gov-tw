import FuturePlan from "~/routes/future-plan";

import { type StaticGenerateHandler } from "@builder.io/qwik-city";

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: [{ locale: "en", param: "future-plan" }],
  };
};

export default FuturePlan;
