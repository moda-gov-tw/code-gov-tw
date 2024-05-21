import {
  component$,
  useSignal,
  useStore,
  useComputed$,
  $,
  useTask$,
} from "@builder.io/qwik";
import Section from "~/components/section";
import { PageNav } from "~/routes/projects/page-nav";
import Filter from "~/routes/projects/filter";
import projectData from "~/data/projects.json";
import filters from "~/data/filters.json";
import projectIndex from "~/data/index.json";
import MobileFilterClose from "./mobile-filter-close";
import MobileFilterOpen from "./mobile-filter-open";
import RepoList from "./repo-list";

function paginateData(
  filteredData: number[],
  pageNumber: number,
  itemsPerPage: number,
): number[] {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredData.slice(startIndex, endIndex);
}

export default component$(() => {
  const mobileFilterStatus = useSignal(false);
  const itemsPerPage = 5;
  const currentPage = useSignal(1);
  const filterStore = useStore({
    features: [],
    repoOwners: [],
    techStacks: [],
  });

  useTask$(({ track }) => {
    track(() => filterStore.features);
    track(() => filterStore.repoOwners);
    track(() => filterStore.techStacks);

    currentPage.value = 1;
  });

  const computedProjects = useComputed$(
    (): { data: number[]; total: number } => {
      const projectList: number[] = [];
      filterStore.features.forEach((feature) => {
        const target = projectIndex.features[feature] as number[];
        projectList.push(...target);
      });
      filterStore.repoOwners.forEach((repoOwner) => {
        const target = projectIndex.repoOwners[repoOwner] as number[];
        projectList.push(...target);
      });
      filterStore.techStacks.forEach((techStack) => {
        const target = projectIndex.techStacks[techStack] as number[];
        projectList.push(...target);
      });

      let uniqueProjectList = [...new Set(projectList)];

      // If no filters are selected, show all projects
      if (uniqueProjectList.length === 0) {
        uniqueProjectList = [...Array.from(projectData.keys())];
      }

      const pages = paginateData(
        uniqueProjectList,
        currentPage.value,
        itemsPerPage,
      );

      return {
        data: pages,
        total: uniqueProjectList.length,
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
              <RepoList projectsID={computedProjects.value.data} />
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
