import { component$ } from "@builder.io/qwik";
import MODALogo from "~/media/logos/MODA-logo.svg?jsx";
import DemocracyNetworkLogo from "~/media/logos/Democracy-network-logo.svg?jsx";

export default component$(() => {
  return (
    <div class="flex flex-col items-center gap-2 md:items-start">
      <small>{$localize`數位發展部民主網絡司`}</small>
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
      <small>{$localize`更新日期：2024-04-30`}</small>
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
      <small class="mt-4 flex flex-col items-center gap-2 md:flex-row">
        <MODALogo class="h-7" />
        <DemocracyNetworkLogo class="h-7" />
      </small>
    </div>
  );
});
