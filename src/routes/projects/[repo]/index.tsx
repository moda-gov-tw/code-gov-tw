import { component$ } from "@builder.io/qwik";
import { useLocation, type StaticGenerateHandler } from "@builder.io/qwik-city";
import Section from "~/components/section";
import Breadcrumb from "~/components/breadcrumb";
import ArrowTopRightOnSquare from "~/media/icons/arrow-top-right-on-square.svg?jsx";
import Button from "~/components/button";
import List from "~/routes/projects/[repo]/list";
import Carousel from "~/routes/projects/[repo]/carousel";

import type { Project } from "~/types/Project";
import projects from "~/data/projects.json";
import Openapi from "./openapi";

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const length = projects.length;
  const paths = [];
  for (let i = 0; i < length; i++) {
    paths.push({ repo: `${i}` });
  }
  return {
    params: paths,
  };
};

export default component$(() => {
  const { params } = useLocation();
  const { repo } = params;
  const index = parseInt(repo);
  const project = projects[index] as Project;

  const demoURL = project.landingURL;

  const projectName =
    project.description["zh-Hant"].localisedName || project.name;

  const longDescription = project.description["zh-Hant"].longDescription;
  const description =
    longDescription ?? project.description["zh-Hant"].shortDescription;

  const images = project.description["zh-Hant"].screenshots;

  const features = project.description["zh-Hant"].features;
  const dependsOn = project.dependsOn?.open?.map((dep) => dep.name);
  const techStacks = project.tw.techStacks?.map((tech) => tech.name);
  const totalTechs = [...(techStacks ?? []), ...(dependsOn ?? [])];
  const vulnerabilityScanners = project.tw.vulnerabilityScanners;
  const license = project.legal.license;
  const usedBy = project.usedBy;
  const repoOwner = project.legal.repoOwner;
  const releaseDate = project.releaseDate;
  const createdDate = project.tw.createdDate;

  const contact = project.maintenance.contacts.at(0);
  const contactInfo = contact && [contact.name, contact.email, contact.phone];

  // Workaround for the file not ready
  const openAPISource = project.tw.openapi;

  return (
    <>
      <Section>
        <Breadcrumb
          pages={[
            { title: $localize`專案一覽`, href: "/projects", current: false },
            {
              title: $localize`專案細節`,
              href: "#",
              current: true,
            },
          ]}
        />
        <h1 class="mt-4 text-brand-primary">{projectName}</h1>
        <div class="mt-8 flex flex-col gap-4 md:flex-row">
          {demoURL && (
            <Button class="md:w-auto" href={demoURL} target="_blank">
              {$localize`DEMO 網站`}
              <ArrowTopRightOnSquare
                q:slot="icon-right"
                class="w-5 text-brand-primary"
                aria-hidden="true"
              />
            </Button>
          )}
          <Button
            class="!bg-brand-primary !text-white md:w-auto"
            href={`${project.url ?? "#"}`}
            target="_blank"
          >
            {$localize`公共程式頁面`}
            <ArrowTopRightOnSquare
              q:slot="icon-right"
              class="w-5 text-white"
              aria-hidden="true"
            />
          </Button>
        </div>
      </Section>
      {images && (
        <Section class="bg-gray-100">
          <div class="flex flex-col">
            <div class="h-0 w-20 border-t-2 border-primary" />
            <h2 class="mt-4">{$localize`公共程式截圖`}</h2>
          </div>
          <div class="mt-8">
            <Carousel images={images} />
          </div>
        </Section>
      )}
      <Section>
        <div class="flex flex-col">
          <div class="h-0 w-20 border-t-2 border-primary" />
          <h2 class="mt-4">{$localize`公共程式細節`}</h2>
        </div>

        <div class="mt-8">
          <List title={$localize`公共程式描述`} contents={[description]} />
          <List title={$localize`內含功能`} contents={features} />
          <List title={$localize`使用技術`} contents={totalTechs} />
          <List
            title={$localize`使用之弱點掃描工具`}
            contents={vulnerabilityScanners}
          />
          <List title={$localize`授權方式`} contents={[license]} />
          <List useMarkdown title={$localize`目前使用案例`} contents={usedBy} />
          <List title={$localize`提供部門`} contents={[repoOwner]} />
          <List title={$localize`聯絡窗口`} contents={contactInfo} />
          <List title={$localize`建立時間`} contents={[createdDate]} />
          <List title={$localize`最後更新時間`} contents={[releaseDate]} />
        </div>
      </Section>
      {openAPISource && (
        <Section class="bg-gray-100">
          <div class="flex flex-col">
            <div class="h-0 w-20 border-t-2 border-primary" />
            <h2 class="mt-4">{$localize`相關 API`}</h2>
          </div>
          {openAPISource.map((openAPI) => (
            <Openapi
              key={`index-${openAPI.name}`}
              name={openAPI.name}
              description={openAPI.description}
              url={openAPI.url}
            />
          ))}
        </Section>
      )}
    </>
  );
});
