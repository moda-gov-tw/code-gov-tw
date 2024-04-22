import { component$, $ } from "@builder.io/qwik";
import ArrowLeftIcon from "~/media/icons/arrow-left-icon.svg?jsx";
import ArrowRightIcon from "~/media/icons/arrow-right-icon.svg?jsx";

type PageNavProps = {
  currentPage: any;
  itemsPerPage: number;
  totalItems: number;
};

function calculatePageRange(currentPage: number, totalPage: number) {
  let startPage = Math.max(currentPage - 1, 2);
  let endPage = Math.min(currentPage + 1, totalPage - 1);

  if (currentPage - 1 < 2) {
    endPage = 4;
  } else if (totalPage - currentPage < 2) {
    startPage = totalPage - 3;
  }

  return { startPage, endPage };
}

function generatePageNumbers(totalPage: number, currentPageValue: number) {
  if (totalPage <= 8) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  const pages = [1];

  const { startPage, endPage } = calculatePageRange(
    currentPageValue,
    totalPage,
  );

  if (startPage > 2) pages.push(-1);
  for (let i = startPage; i <= endPage; i++) pages.push(i);
  if (endPage < totalPage - 1) pages.push(-1);
  pages.push(totalPage);

  return pages;
}

export const PageNav = component$<PageNavProps>(
  ({ currentPage, itemsPerPage, totalItems }) => {
    const totalPage = Math.ceil(totalItems / itemsPerPage);

    const handleNextPage = $(() => {
      if (currentPage.value * itemsPerPage >= totalItems) {
        return;
      }
      currentPage.value++;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const handlePrevPage = $(() => {
      if (currentPage.value === 1) return;
      currentPage.value--;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const generatePageList = () => {
      const pages = generatePageNumbers(totalPage, currentPage.value);

      return pages.map((page, index) => (
        <button
          key={index}
          class={[
            "group relative w-10 font-medium hover:text-brand-secondary",
            currentPage.value === page
              ? "text-brand-secondary"
              : "text-gray-300",
            "transition-colors duration-[50ms] ease-out",
          ]}
          onClick$={() => (currentPage.value = page)}
          disabled={page === -1}
        >
          {page === -1 ? "..." : page}
          <span
            class={[
              "absolute inset-x-0 -top-4 w-10 border-t-2 border-brand-secondary group-hover:border-brand-secondary",
              currentPage.value === page
                ? "border-brand-secondary"
                : "border-transparent",
              "transition-colors duration-[50ms] ease-out",
            ]}
          ></span>
        </button>
      ));
    };

    return (
      <div class="flex justify-between border-t-[1px] pt-4">
        <button
          class={[
            currentPage.value === 1 ? "pointer-events-none opacity-0" : "",
          ]}
          onClick$={handlePrevPage}
        >
          <div class="flex gap-3">
            <ArrowLeftIcon class="w-5" />
            <div class="text-sm font-medium">{$localize`上一頁`}</div>
          </div>
        </button>

        <div class="hidden xl:flex">{generatePageList()}</div>

        <button
          class={[
            currentPage.value * itemsPerPage >= totalItems
              ? "pointer-events-none hidden"
              : "",
          ]}
          onClick$={handleNextPage}
          disabled={currentPage.value * itemsPerPage >= totalItems}
        >
          <div class="flex gap-3">
            <div class="text-sm font-medium">{$localize`下一頁`}</div>
            <ArrowRightIcon class="w-5" />
          </div>
        </button>
      </div>
    );
  },
);
