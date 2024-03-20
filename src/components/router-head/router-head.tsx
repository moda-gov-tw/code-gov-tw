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
      <meta property="og:image" content="/images/fbshare.jpg" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta
        property="og:description"
        content="數位發展部 Ministry of Digital Affairs (moda) 作為臺灣數位發展的「mòda（馬達）」，將連結「公民」與「技術」、提升「產業」及「安全」，實現智慧國家的願景，並以臺灣模式持續引領世界。"
      />
      <meta name="keywords" content="" />
      <meta
        name="description"
        content="數位發展部 Ministry of Digital Affairs (moda) 作為臺灣數位發展的「mòda（馬達）」，將連結「公民」與「技術」、提升「產業」及「安全」，實現智慧國家的願景，並以臺灣模式持續引領世界。"
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
