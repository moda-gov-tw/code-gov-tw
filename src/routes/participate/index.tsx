import { component$ } from "@builder.io/qwik";
import Section from "~/components/section";
import Promotion from "~/components/promotion";
import ParticipateScreenshot1 from "~/media/images/participate-screenshot-1.png?jsx";
import ParticipateScreenshot2 from "~/media/images/participate-screenshot-2.png?jsx";
import Block from "./block";

export default component$(() => {
  return (
    <>
      <Section>
        <h1 class="text-primary">{$localize`如何參與`}</h1>
      </Section>

      <Section>
        <div class="flex flex-col">
          <div class="h-0 w-20 border-t-2 border-primary" />
          <h2 class="mt-4">{$localize`在程式碼的世界裡實踐公共力`}</h2>
          <p class="mt-8">
            {$localize`公共程式發展初期，你是否也想嘗試參與？那就開始練習使用協作平臺吧。協作平臺是一個存放與管理程式碼的服務，各政府機關都將其管理的公共程式存放於此。不同程式開放不同程度的參與權限，因此在瀏覽找到你想參與的公共程式後，藉由閱讀以下說明，前往協作平臺給予意見回饋，或提供專業技術協助。`}
          </p>
        </div>
        <div class="mt-8 flex flex-col gap-8">
          <Block title={$localize`透過 Issue 回報錯誤或提出意見`}>
            <div>
              {$localize`Issue 是協作平臺上的一種重要功能，類似網路論壇的討論區。讓有權限的協作者，可以針對特定程式提出意見與討論。無論是回報錯誤、建議新功能，甚至只是提問或尋求幫助，都可以透過 issue 完成。以下是如何建立 issue 的說明方式：`}
            </div>
            <div>{$localize`1. 註冊或登錄協作平臺。`}</div>
            <div>
              {$localize`2. 在想參與的公共程式頁面裡，找到「Issues」標籤，並點擊右上角的「New Issue」。`}
              <ParticipateScreenshot1
                class="mt-4 lg:max-w-4xl"
                alt="Start new issue"
              />
            </div>
            <div>
              {$localize`3. 填寫 Issue 的標題和詳細描述，盡可能清晰地說明您想提出的意見，或是遇到的問題。如果項目中已經有相關討論串，則可以按照討論串上的指引，加入回覆。填寫完畢後請點擊「Submit new issue」，進行提交。`}
              <ParticipateScreenshot2
                class="mt-4 lg:max-w-4xl"
                alt="Writing new issue"
              />
            </div>
            <div>
              {$localize`4. 送出 issue 後，會由該公共程式的管理人來回應，敬請耐心等候。`}
            </div>
          </Block>
          <Block title={$localize`透過 Pull Request 提出程式碼修改建議`}>
            <div>
              {$localize`Pull Request 是協作平臺中的一種通知機制，允許專業協作者告訴其他人有一段代碼已經完成修改。目前各政府機關於協作平臺上儲存的公共程式，提供不同程度的參與形式。因此若是您欲投入專業協作，包括進行代碼審查、討論和改進，請直接前往想參與的公共程式，查看是否開放 Pull Request。`}
            </div>
          </Block>
        </div>
      </Section>

      <Section>
        <div class="flex flex-col">
          <div class="h-0 w-20 border-t-2 border-primary" />
          <h2 class="mt-4">{$localize`其他合作`}</h2>
          <div class="mt-8">
            {$localize`若您為學術單位，有興趣與我們進行更深度的合作，如共同發展示範案例、研究公共程式相關的規範等，或是任何其他想法，歡迎直接與我們聯繫。聯繫方式：`}
            <a
              href="https://www-mailbox.moda.gov.tw"
              target="mailbox"
              title="moda mailbox(另開新視窗)"
              class="underline"
              >
              www-mailbox.moda.gov.tw
            </a>
          </div>
        </div>
      </Section>
      <Promotion />
    </>
  );
});
