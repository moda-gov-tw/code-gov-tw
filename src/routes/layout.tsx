import {
  $,
  component$,
  Slot,
  useSignal,
  useContextProvider,
  useOnWindow,
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import Footer from "~/components/footer";
import Header from "~/components/header";
import {
  Theme,
  ThemeContext,
  UserThemeContext,
} from "~/contexts/theme-context";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  const theme = useSignal<Theme>(Theme.light);
  const userTheme = useSignal<Theme | null>(null);

  useContextProvider(ThemeContext, theme);
  useContextProvider(UserThemeContext, userTheme);

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (window.matchMedia) {
        const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");
  
        theme.value = darkMedia.matches ? Theme.dark : Theme.light;
  
        darkMedia.addEventListener("change", (event: MediaQueryListEvent) => {
          theme.value = event.matches ? Theme.dark : Theme.light;
        });
      }

      const localTheme = localStorage.getItem("theme");
      if (localTheme === Theme.dark) userTheme.value = Theme.dark;
      else if (localTheme === Theme.light) userTheme.value = Theme.light;
    }),
  );


  const tValue = userTheme.value || theme.value;
  return (
    <div class={{ dark: tValue === Theme.dark }}>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
