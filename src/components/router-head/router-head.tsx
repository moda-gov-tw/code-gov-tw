import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>
        {head.title ||
          "Public Code Platform — 數位發展部 Ministry of Digital Affairs"}
      </title>
      <meta
        property="og:title"
        content="Public Code Platform — 數位發展部 Ministry of Digital Affairs"
      />
      <meta property="og:image" content="/images/fbshare.webp" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta
        property="og:description"
        content="公共程式平臺鼓勵跨機關、產業和公眾都可共同使用、 檢視、修正政府數位服務或系統的程式碼，將可促進機關數位交流，共同提升政府公共服務品質、提升政府公開透明。"
      />
      <meta name="keywords" content="" />
      <meta
        name="description"
        content="公共程式平臺鼓勵跨機關、產業和公眾都可共同使用、 檢視、修正政府數位服務或系統的程式碼，將可促進機關數位交流，共同提升政府公共服務品質、提升政府公開透明。"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={loc.url.href} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}
      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}
      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
