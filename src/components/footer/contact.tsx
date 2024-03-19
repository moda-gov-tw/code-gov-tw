import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex flex-col items-center md:items-start">
      <h3 class="mb-4">{$localize`公共程式平台`}</h3>
      <div class="flex flex-col items-center gap-2 md:items-start">
        <small>{$localize`數位發展部民主網絡司`}</small>
        <small>{$localize`100057 臺北市中正區延平南路143號`}</small>
        <small>{$localize`xxxx@moda.gov.tw`}</small>
        <small>{$localize`更新日期：2024-01-24`}</small>
        <small>
          <a href="https://spdx.org/licenses/CC0-1.0" target="_blank">
            <span class="underline">CC0</span>
          </a>
          <span> No copyright reserved.</span>
        </small>
      </div>
    </div>
  );
});
