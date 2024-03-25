## Project Structure

這個專案使用了Qwik與[QwikCity](https://qwik.builder.io/qwikcity/overview/)。QwikCity是建立在Qwik之上的一套附加工具，用以簡化完整網站建置的流程，包括基於目錄的路由、版面配置等功能。

在您的專案中，您將看到以下的目錄結構：

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

- `src/components`：共用元件的目錄。
- `src/data`：儲存專案列表及篩選選項。
- `src/locales`：儲存國際化(i18n)的本地字串。
- `src/media`：儲存媒體資源，如圖示、圖片，用於Qwik圖片優化。
- `src/routes`：提供基於目錄的路由，可以包含`layout.tsx`版面配置檔案的階層結構，以及作為頁面的`index.tsx`檔案。此外，`index.ts`檔案是端點。若想暸解更多路由的資訊請看[官方文件](https://qwik.builder.io/qwikcity/routing/overview/)
- `src/types`：儲存類型。
- `public`：任何靜態資產，如圖片，都可以放在public目錄中。想暸解更多資訊情看 [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory)

## Development

開發模式使用[Vite的開發伺服器](https://vitejs.dev/)。`dev`指令會在開發時進行伺服器端渲染(SSR)輸出。

> 注意：在開發模式中，Vite可能會請求大量的`.js`檔案。這並不代表Qwik的生產環境構建。

## Preview

預覽指令會建立客戶端模組的生產構建，並運行一個本地伺服器。預覽伺服器僅為在本地預覽生產構建提供便利，不應作為生產伺服器使用。

```shell
pnpm preview # or `pnpm preview`
```

## Production

生產構建將通過運行客戶端和伺服器構建指令來生成客戶端和伺服器模組。構建指令將使用Typescript對原始碼進行類型檢查。

```shell
pnpm build # or `pnpm build`
```

## 部署

由於本專案目前使用靜態網頁部署, 執行完 `pnpm build` 後產生的 `dist` 資料夾的內容就可以直接上傳部署

## 測試靜態網站

```shell
npx http-server ./dist
```

## 支援工具

### publiccode-parser

這個工具用於更新專案列表和篩選器選項。

1. 新增符合[publiccode.yml 標準](https://github.com/publiccodeyml/publiccode.yml)的檔案, 可複製[範本](../publiccode-parser/template.yml)使用

2. 將該 yml 檔案至路徑 `publiccode-parser/projects` 中

3. 執行程式並更新網站資料

```sh
npx tsx publiccode-parser/generator.ts && cp publiccode-parser/outputs/* src/data/
```

### 國際化 Internationalization (i18n)

- 從原始碼中取出要翻譯的字串

```shell
pnpm i18n-extract
```

- 執行指令後會建立 `./src/locales/message.zh-hant.json` 檔案，以該檔案的內容建立其他語系檔案中並更新內容 (例如建立一個新的黨案 message.en.json 並將 `locale` 的值更新為 `en` 並翻譯內容的字串)
