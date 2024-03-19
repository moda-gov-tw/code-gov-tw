import IndividualPublicCode from "../../../projects/[repo]";
import { type StaticGenerateHandler } from "@builder.io/qwik-city";
import projects from "~/data/projects.json";

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const length = projects.length;
  const paths = [];
  for (let i = 0; i < length; i++) {
    paths.push({ locale: "en", repo: `${i}` });
  }
  return {
    params: paths,
  };
};
export default IndividualPublicCode;
