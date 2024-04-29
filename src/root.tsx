import { component$, useServerData } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { useI18n } from "./i18n-utils";
import "./global.css";

export default component$(() => {
  const nonce = useServerData<string | undefined>("nonce");
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  const csp = [
    `default-src 'self'`,
    `font-src 'self' data:`,
    `img-src 'self' data:`,
    `script-src 'self' 'nonce-${nonce}'`,
    `style-src 'self' 'nonce-${nonce}'`,
    `frame-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ];
  useI18n();
  return (
    <QwikCityProvider viewTransition={false}>
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="Content-Security-Policy" content={csp.join("; ")} />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body>
        <RouterOutlet />
        <ServiceWorkerRegister nonce={nonce} />
      </body>
    </QwikCityProvider>
  );
});
