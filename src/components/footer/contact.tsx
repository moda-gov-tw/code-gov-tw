import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex flex-col items-center gap-2 md:items-start">
      <small>{$localize`數位發展部`}</small>
      <small>{$localize`100057 臺北市中正區延平南路143號`}</small>
      <small>
        {$localize`民意信箱: `}
        <a
          href="https://www-mailbox.moda.gov.tw"
          target="mailbox"
          title="moda mailbox(另開新視窗)"
          class="underline"
        >
          www-mailbox.moda.gov.tw
        </a>
      </small>
      <small>{$localize`更新日期：2024-01-24`}</small>
      <small>
        <a
          href="https://spdx.org/licenses/CC0-1.0"
          target="cc0"
          title="Creative Commons Zero (另開新視窗)"
        >
          <span class="underline">CC0</span>
        </a>
        <span> No copyright reserved.</span>
      </small>
    </div>
  );
});
