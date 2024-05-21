import { component$, $, useOnDocument } from "@builder.io/qwik";

import PageNextButton from "./page-next-button";
import PagePrevButton from "./page-prev-button";
import PageNumberButton from "./page-number-button";

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

    const updateQueryParameter = $(() => {
      // Workaround for the issue that the query parameters are not extracted in useLocation
      const queryParameters = new URLSearchParams(document.location.search);
      queryParameters.set("page", currentPage.value.toString());
      window.history.replaceState({}, "", `?${queryParameters}`);
    });

    const initQueryParameter = $(() => {
      // Workaround for the issue that the query parameters are not extracted in useLocation
      const queryParameters = new URLSearchParams(document.location.search);
      const page = queryParameters.get("page");
      if (page === null) {
        currentPage.value = 1;
        updateQueryParameter();
        return;
      }

      const pageNumber = parseInt(page);

      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPage) {
        currentPage.value = pageNumber;
      } else {
        currentPage.value = 1;
      }
      updateQueryParameter();
    });

    useOnDocument("DOMContentLoaded", initQueryParameter);

    const handleNextPage = $(() => {
      if (currentPage.value * itemsPerPage >= totalItems) {
        return;
      }
      currentPage.value++;
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateQueryParameter();
    });

    const handlePrevPage = $(() => {
      if (currentPage.value === 1) return;
      currentPage.value--;
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateQueryParameter();
    });

    const handleDirect = $((target: number) => {
      currentPage.value = target;
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateQueryParameter();
    });

    const generatePageList = () => {
      const pages = generatePageNumbers(totalPage, currentPage.value);

      return pages.map((page, index) => (
        <PageNumberButton
          key={index}
          target={page}
          current={currentPage.value}
          onClick$={handleDirect}
        />
      ));
    };

    return (
      <div class="flex justify-between border-t-[1px] pt-4">
        <PagePrevButton
          onClick$={handlePrevPage}
          disabled={currentPage.value === 1}
        />
        <div class="hidden xl:flex">{generatePageList()}</div>
        <PageNextButton
          onClick$={handleNextPage}
          disabled={currentPage.value * itemsPerPage >= totalItems}
        />
      </div>
    );
  },
);
