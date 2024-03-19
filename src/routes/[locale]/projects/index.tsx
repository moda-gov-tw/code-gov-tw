import Projects from "~/routes/projects";
import { type StaticGenerateHandler } from "@builder.io/qwik-city";

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: [{ locale: "en", param: "projects" }],
  };
};

export default Projects;
