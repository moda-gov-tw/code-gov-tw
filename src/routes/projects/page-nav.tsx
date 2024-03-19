import { component$, $ } from "@builder.io/qwik";
import ArrowLeftIcon from "~/media/icons/arrow-left-icon.svg?jsx";
import ArrowRightIcon from "~/media/icons/arrow-right-icon.svg?jsx";

type PageNavProps = {
  currentPage: any;
  itemsPerPage: number;
  totalItems: number;
};

function handleFewPages(totalPage: number) {
  return Array.from({ length: totalPage }, (_, i) => i + 1);
}

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

export const PageNav = component$<PageNavProps>(
  ({ currentPage, itemsPerPage, totalItems }) => {
    const totalPage = Math.ceil(totalItems / itemsPerPage);

    const handleNextPage = $(() => {
      if (currentPage.value * itemsPerPage >= totalItems) {
        return;
      }
      currentPage.value++;
    });

    const handlePrevPage = $(() => {
      if (currentPage.value === 1) return;
      currentPage.value--;
    });

    const generatePageList = () => {
      const pages = [];
      if (totalPage <= 8) {
        return handleFewPages(totalPage);
      } else {
        // Add the first page
        pages.push(1);

        const { startPage, endPage } = calculatePageRange(
          currentPage.value,
          totalPage,
        );

        // Add ellipsis if there's a gap between the first page and the start page
        if (startPage > 2) {
          pages.push("...");
        }

        // Add the middle pages
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        // Add ellipsis if there's a gap between the end page and the last page
        if (endPage < totalPage - 1) {
          pages.push("...");
        }

        // Add the last page
        pages.push(totalPage);
      }
      return pages;
    };

    return (
      <div class="flex justify-between border-t-[1px] pt-4">
        <button
          class={[
            currentPage.value === 1 ? "pointer-events-none text-gray-300" : "",
          ]}
          onClick$={handlePrevPage}
        >
          <div class="flex gap-3">
            <ArrowLeftIcon class="w-5" />
            <div class="text-sm font-medium">{$localize`上一頁`}</div>
          </div>
        </button>

        <div class="hidden xl:flex">
          {generatePageList().map((page, index) => (
            <button
              key={index}
              class={[
                "group relative w-10 font-medium hover:text-brand-secondary",
                currentPage.value === page
                  ? "text-brand-secondary"
                  : "text-gray-300",
                "transition-colors duration-[50ms] ease-out",
              ]}
              onClick$={() => {
                if (page !== "...") {
                  currentPage.value = page;
                }
              }}
              disabled={page === "..."}
            >
              {page}
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
          ))}
        </div>

        <button
          class={[
            currentPage.value * itemsPerPage >= totalItems
              ? "pointer-events-none text-gray-300"
              : "",
          ]}
          onClick$={handleNextPage}
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
