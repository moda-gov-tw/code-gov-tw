import {
  component$,
  useStore,
  $,
  useSignal,
  useOnDocument,
} from "@builder.io/qwik";
import FilterCheckbox from "./filter-checkbox";
import { useLocation } from "@builder.io/qwik-city";

type FilterProps = {
  filterName: string;
  categoryName: string;
  filterOptions: string[];
  store?: any;
};

export default component$<FilterProps>((props) => {
  const location = useLocation();
  const filterSize = useSignal(0);

  const filters = useStore({
    status: new Array(props.filterOptions.length).fill(false),
  });

  const updateQueryParameters = $((seletedFilter: string[]) => {
    const queryParameters = location.url.searchParams;
    if (seletedFilter.length === 0) {
      queryParameters.delete(props.filterName);
      // Remove the query parameter if there are no filters selected
      const final =
        queryParameters.size === 0
          ? location.url.pathname
          : `?${queryParameters}`;
      window.history.replaceState({}, "", final);
      return;
    }

    queryParameters.set(props.filterName, seletedFilter.join(","));
    window.history.replaceState({}, "", `?${queryParameters}`);
  });

  const updateFilters = $(() => {
    const seletedFilter = [] as string[];
    filters.status.forEach((status, index) => {
      if (status) {
        seletedFilter.push(props.filterOptions[index]);
      }
    });

    props.store[props.filterName] = seletedFilter;
    updateQueryParameters(seletedFilter);
    filterSize.value = seletedFilter.length;
  });

  const initQueryParameters = $(() => {
    const queryParameters = location.url.searchParams;
    const selectedFilters = queryParameters.get(props.filterName);
    if (selectedFilters) {
      const selectedFiltersArray = selectedFilters.split(",");
      selectedFiltersArray.forEach((selectedFilter) => {
        const index = props.filterOptions.indexOf(selectedFilter);
        if (index !== -1) {
          filters.status[index] = true;
        }
      });
      updateQueryParameters(selectedFiltersArray);
      updateFilters();
      filterSize.value = selectedFiltersArray.length;
    }
  });

  useOnDocument("DOMContentLoaded", initQueryParameters);

  const handleFilterChange = $((index: number, state: boolean) => {
    filters.status[index] = state;
    updateFilters();
  });

  const handleCheckAll = $(() => {
    filters.status.forEach((_, index) => {
      filters.status[index] = true;
    });
    updateFilters();
  });

  const handleClearFilters = $(() => {
    filters.status.forEach((_, index) => {
      filters.status[index] = false;
    });
    updateFilters();
  });

  return (
    <div
      role="group"
      aria-labelledby={props.filterName}
      class="flex flex-col gap-4 border-t border-gray-400 pt-4 last-of-type:border-b last-of-type:pb-4"
    >
      <div class="flex items-center justify-between">
        <div id={props.filterName}>
          <h4>{props.categoryName}</h4>
        </div>
        {filterSize.value < 2 ? (
          <button onClick$={handleCheckAll}>
            <div class="font-medium text-brand-secondary">{$localize`全選`}</div>
          </button>
        ) : (
          <button onClick$={handleClearFilters}>
            <div class="font-medium text-brand-secondary">{$localize`取消全選`}</div>
          </button>
        )}
      </div>
      <div class="flex flex-col gap-2">
        {props.filterOptions.map((option, index) => {
          return (
            <FilterCheckbox
              key={option}
              option={option}
              index={index}
              filterName={props.filterName}
              onChange$={handleFilterChange}
              checked={filters.status[index]}
            />
          );
        })}
      </div>
    </div>
  );
});
