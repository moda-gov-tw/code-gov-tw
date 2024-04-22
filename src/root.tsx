import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { useI18n } from "./i18n-utils";
import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  const csp = [
    `default-src 'none'`, // By default, block everything
    `script-src 'self' 'unsafe-inline'`,
    `connect-src 'self'`,
    `img-src 'self'`,
    `style-src 'self' 'unsafe-inline'`,
    `manifest-src 'self' 'unsafe-inline'`,
  ];

  useI18n();
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="Content-Security-Policy" content={csp.join("; ")} />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
