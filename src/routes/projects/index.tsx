import {
  component$,
  useSignal,
  useStore,
  useComputed$,
  $,
} from "@builder.io/qwik";
import Section from "~/components/section";
import { RepoBlock } from "~/routes/projects/repo-block";
import { PageNav } from "~/routes/projects/page-nav";

import Filter from "~/routes/projects/filter";
import localProjects from "~/data/projects.json";
import filters from "~/data/filters.json";
import type { Project } from "~/types/Project";
import {
  filterProjectsByFeatures,
  filterProjectsByRepoOwners,
  filterProjectsByTechStacks,
} from "~/routes/projects/filter-rules";
import MobileFilterClose from "./mobile-filter-close";
import MobileFilterOpen from "./mobile-filter-open";

function paginateData(
  filteredData: Project[],
  pageNumber: number,
  itemsPerPage: number,
): Project[] {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredData.slice(startIndex, endIndex);
}

export default component$(() => {
  const mobileFilterStatus = useSignal(false);
  const itemsPerPage = 5;
  const currentPage = useSignal(1);
  const store = useStore({
    projects: localProjects,
  });

  const filterStore = useStore({
    features: [],
    repoOwners: [],
    techStacks: [],
  });

  const computedProjects = useComputed$(
    (): { data: Project[]; total: number } => {
      const filteredProjects = store.projects.filter((project) => {
        return (
          filterProjectsByFeatures(project, filterStore.features) &&
          filterProjectsByRepoOwners(project, filterStore.repoOwners) &&
          filterProjectsByTechStacks(project, filterStore.techStacks)
        );
      });
      return {
        data: paginateData(filteredProjects, currentPage.value, itemsPerPage),
        total: filteredProjects.length,
      };
    },
  );

  const mainFilterHandler = $(async () => {
    mobileFilterStatus.value = !mobileFilterStatus.value;
  });

  return (
    <>
      <Section class={[mobileFilterStatus.value ? "hidden" : "block"]}>
        <h1 class="text-primary">{$localize`公共程式專案一覽`}</h1>
        <div class="h2-sub mt-4">
          {$localize`公共程式由各政府單位提供，以下匯集國內外不同單位的公共程式。`}
        </div>
      </Section>
      <MobileFilterClose
        display={mobileFilterStatus.value}
        onClick$={mainFilterHandler}
      />
      <MobileFilterOpen
        display={mobileFilterStatus.value}
        onClick$={mainFilterHandler}
      />
      <Section class="bg-gray-100">
        <div class="md:flex md:gap-20">
          <div
            class={[
              mobileFilterStatus.value ? "block" : "hidden",
              "md:block md:flex-shrink-0",
            ]}
          >
            <div id="filter" class="flex flex-shrink-0 flex-col gap-8">
              <Filter
                filterName="features"
                categoryName={$localize`功能類型`}
                filterOptions={filters.features}
                store={filterStore}
              />
              <Filter
                filterName="repoOwners"
                categoryName={$localize`提供單位`}
                filterOptions={filters.repoOwners}
                store={filterStore}
              />
              <Filter
                filterName="techStacks"
                categoryName={$localize`使用技術`}
                filterOptions={filters.techStacks}
                store={filterStore}
              />
            </div>
          </div>
          <div class={[mobileFilterStatus.value ? "hidden" : "block", "flex"]}>
            <div id="projects" class="flex flex-col gap-8">
              {computedProjects.value.data.map((project) => {
                const projectName =
                  project.description["zh-Hant"].localisedName || project.name;
                const mainCopyrightOwner = project.legal.mainCopyrightOwner;
                const repoOwner = project.legal.repoOwner.split(" ")[0];
                const projectDescription =
                  project.description["zh-Hant"].shortDescription;
                const projectFeatures = project.description["zh-Hant"].features;
                const mainCopyrightOwnerLogo =
                  project.tw.mainCopyrightOwnerLogo;
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
              <PageNav
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={computedProjects.value.total}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
});
