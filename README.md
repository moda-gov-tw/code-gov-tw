# Codegov

## Project Structure

This project is using Qwik with [QwikCity](https://qwik.builder.io/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    ├── data/
    │   └── ...
    ├── locales/
    │   └── ...
    ├── media/
    │   └── ...
    ├── routes/
    │   └── ...
    └── types/
        └── ...
```

- `src/components`: Directory for common components.

- `src/data`: Store list of projects and options for filters

- `src/locales`: Store locale strings for i18n

- `src/media`: Store media like icons, images for Qwik Image Optimization

- `src/routes`: Provides the directory-based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/types`: Store types.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm start # or `pnpm start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
pnpm preview # or `pnpm preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
pnpm build # or `pnpm build`
```

- deployment

use directory `dist` to upload or deploy to target site

## Static Site Generator (Node.js)

```shell
pnpm build.server
```

## Test Static Site

```shell
npx http-server ./dist
```

## support tools

### publiccode-parser

This tool for update list of projects and filters

1. add yml file to publiccode-parser/projects

2. use command to update data

```sh
npx tsx publiccode-parser/generator.ts && cp publiccode-parser/outputs/* src/data/
```

### Internationalization (i18n)

- extract strings from source code

```shell
pnpm i18n-extract
```

- copy content in ./src/locales/message.zh-hant.json to other locales (e.g. message.en.json and update the value of `locale` with `en` and translate those strings)
