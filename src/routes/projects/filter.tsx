import { component$, useStore, $, useSignal, useTask$ } from "@builder.io/qwik";

type FilterProps = {
  filterName: string;
  categoryName: string;
  filterOptions: string[];
  store?: any;
};

export default component$<FilterProps>((props) => {
  const filterSize = useSignal(0);
  const state = useStore({
    filters: new Set(),
  });

  useTask$(({ track }) => {
    track(() => filterSize.value);
    props.store[props.filterName] = Array.from(state.filters);
  });

  const handleFilterChange = $((e: Event) => {
    const target = e.target as HTMLElement;

    const input = target.querySelector(
      `input[type=checkbox].${props.filterName}`,
    ) as HTMLInputElement;
    input.checked = !input.checked;
    if (input.checked) {
      state.filters.add(input.value);
    } else {
      state.filters.delete(input.value);
    }
    filterSize.value = state.filters.size;
  });

  const handleCheckAll = $(() => {
    const checkboxes = document.querySelectorAll(
      `input[type=checkbox].${props.filterName}`,
    );
    Array.from(checkboxes).forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = true;
      state.filters.add((checkbox as HTMLInputElement).value);
    });
    filterSize.value = state.filters.size;
  });

  const handleClearFilters = $(() => {
    const checkboxes = document.querySelectorAll(
      `input[type=checkbox].${props.filterName}`,
    );
    Array.from(checkboxes).forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
    state.filters.clear();
    filterSize.value = state.filters.size;
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
        {filterSize.value !== props.filterOptions.length ? (
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
        {props.filterOptions.map((option) => {
          return (
            <div
              key={option}
              class="flex cursor-pointer items-center gap-4"
              onClick$={handleFilterChange}
            >
              <input
                id={option}
                class={[
                  "pointer-events-none h-4 w-4 accent-brand-primary",
                  props.filterName,
                ]}
                type="checkbox"
                value={option}
                onChange$={handleFilterChange}
              />
              <label for={option} class="pointer-events-none">
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
});
