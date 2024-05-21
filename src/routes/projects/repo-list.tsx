import { component$ } from "@builder.io/qwik";
import projectData from "~/data/projects.json";
import { RepoBlock } from "~/routes/projects/repo-block";

type Props = {
  projectsID: number[];
};

export default component$<Props>((props) => {
  return (
    <>
      {props.projectsID.map((index) => {
        const project = projectData[index];
        const projectName =
          project.description["zh-Hant"].localisedName || project.name;
        const mainCopyrightOwner = project.legal.mainCopyrightOwner;
        const repoOwner = project.legal.repoOwner.split(" ")[0];
        const projectDescription =
          project.description["zh-Hant"].shortDescription;
        const projectFeatures = project.description["zh-Hant"].features;
        const mainCopyrightOwnerLogo = project.tw.mainCopyrightOwnerLogo;
        return (
          <RepoBlock
            id={project.id}
            key={project.name}
            name={projectName}
            repoOwner={repoOwner}
            mainCopyrightOwner={mainCopyrightOwner}
            mainCopyrightOwnerLogo={mainCopyrightOwnerLogo}
            shortDescription={projectDescription}
            features={projectFeatures}
            dependsOn={project.dependsOn?.open}
            techStacks={project.tw.techStacks}
          />
        );
      })}
    </>
  );
});
