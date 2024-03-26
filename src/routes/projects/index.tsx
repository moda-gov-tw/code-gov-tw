import {
  $,
  component$,
  useSignal,
  useStore,
  useComputed$,
} from "@builder.io/qwik";
import Section from "~/components/section";
import { RepoBlock } from "~/routes/projects/repo-block";
import { PageNav } from "~/routes/projects/page-nav";
import FunnelIcon from "~/media/icons/funnel-icon.svg?jsx";
import Filter from "~/routes/projects/filter";
import localProjects from "~/data/projects.json";
import filters from "~/data/filters.json";
import type { Project } from "~/types/Project";
import {
  filterProjectsByFeatures,
  filterProjectsByRepoOwners,
  filterProjectsByTechStacks,
} from "~/routes/projects/filter-rules";

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
  const itemsPerPage = 5;
  const currentPage = useSignal(1);
  const filter = useSignal(false);
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

  const handleMobileFilter = $(() => (filter.value = !filter.value));

  return (
    <>
      {!filter.value ? (
        <Section>
          <h1 class="text-primary">{$localize`公共程式專案一覽`}</h1>
          <h3 class="mt-4">
            {$localize`公共程式由各政府單位提供，以下匯集國內外不同單位的公共程式。`}
          </h3>
        </Section>
      ) : (
        <div class="sticky top-0 flex items-center justify-between bg-white p-6 md:hidden">
          <h3>{$localize`設定篩選條件`}</h3>
          <button
            class={[
              "flex items-center justify-center gap-4 rounded-md border border-primary bg-white px-3.5 py-2.5 text-base font-semibold text-primary shadow-sm",
              "hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
            ]}
            onClick$={handleMobileFilter}
          >
            {$localize`完成`}
          </button>
        </div>
      )}
      <Section class="bg-gray-100">
        <div class="flex flex-col gap-6 md:flex-row md:gap-20 xl:min-h-[50vh]">
          {!filter.value && (
            <button
              class={[
                "flex items-center justify-center gap-3 rounded-md border border-primary bg-white px-3.5 py-2.5 text-base font-semibold text-primary shadow-sm md:hidden",
                "hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
              ]}
              onClick$={handleMobileFilter}
            >
              {$localize`設定篩選條件`}
              <FunnelIcon
                q:slot="icon-right"
                class="h-5 w-5 text-brand-primary"
              />
            </button>
          )}
          <div
            id="filter"
            class="hidden min-w-60 flex-shrink-0 flex-col gap-8 md:flex"
          >
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
          {filter.value ? (
            <div
              id="filter"
              class="flex min-w-60 flex-shrink-0 flex-col gap-8 md:hidden"
            >
              <Filter
                filterName="features"
                categoryName={$localize`包含系統功能`}
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
          ) : (
            <div id="projects" class="flex w-full flex-col gap-8">
              {computedProjects.value.data.map((project) => {
                const projectName =
                  project.description["zh-Hant"].localisedName || project.name;
                const repoOwner = project.legal.repoOwner.split(" ")[0];
                const projectDescription =
                  project.description["zh-Hant"].shortDescription;
                const projectFeatures = project.description["zh-Hant"].features;
                return (
                  <RepoBlock
                    id={project.id}
                    key={project.name}
                    name={projectName}
                    repoOwner={repoOwner}
                    shortDescription={projectDescription}
                    features={projectFeatures}
                    dependsOn={project.dependsOn?.open}
                  />
                );
              })}
              <PageNav
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={computedProjects.value.total}
              />
            </div>
          )}
        </div>
      </Section>
    </>
  );
});
