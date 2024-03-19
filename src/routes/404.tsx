import { component$ } from "@builder.io/qwik";
import Section from "~/components/Layout/Section";
import Feature02Svg from "~/media/images/about-work-feature-02.svg?jsx";
import useLocaleLink from "~/components/link/useLocaleLink";

export default component$(() => {
  const baselink = useLocaleLink();

  return (
    <Section>
      <div
        class={[
          "flex flex-col gap-8",
          "md:my-32 md:flex-row md:items-center",
          "xl:h-[calc(100vh-335px-240px)] xl:gap-20",
        ]}
      >
        <Feature02Svg class="w-full md:h-80 md:w-80 md:shrink-0" />

        <div class="flex flex-col items-center md:items-start md:justify-center">
          <h1 class="text-brand-primary">404</h1>
          <div class="mt-8">
            <p>
              您所查詢的網址無法顯示，可能是因為您所查詢的網頁或檔案不存在或已被移除，請至
              {/*
               */}
              <a class="underline" href={baselink}>
                網站首頁
              </a>
              {/*
               */}
              查詢您所需要的資訊。
            </p>
            <p class="mt-4">
              The webpage you are trying to access either does not exist or has
              been removed, Please visit the
              {/*
               */}
              <a class="underline" href={baselink}>
                {" "}
                home page
              </a>{" "}
              {/*
               */}
              to find the information you need.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
});
