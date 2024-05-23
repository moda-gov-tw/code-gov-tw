# publiccode-parser

此腳本用於解析指定目錄中符合publiccode.yml標準的 YAML 檔案，從中取出資料，然後將資料整理後的資料儲存為 JSON 檔案。

主要會存成下面三種檔案

- filters.json 篩選器的設定，依據專案 publiccode.yml 的內容而定
- projects.json 本地的專案資料
- index.json: 預先產生篩選器的索引

## 開發

以下指南將幫助您在本地機器上準備環境並執行程式，用於開發和測試目的。

### 先決條件

- 您的本地機器上安裝了 Node.js 版本 18 以上。
- 在您的專案中或全域安裝了 TypeScript。您可以使用以下 npm 命令進行安裝：`npm install -g typescript`

### 安裝

1. 複製 code-gov-tw 專案到您的本地機器。
2. 進入到專案根目錄。
3. 運行 `npm install` 來安裝必要的套件。

### 開發

修改 `publiccode-parser/main.ts` 與 `publiccode-parser/lib/*.ts` 中的內容

### 使用方式

1. 將您專案的 publiccode.yml 檔案放置在 `publiccode-parser/projects` 目錄中。
2. 使用命令 `pnpm build.data` 運行腳本。
3. 腳本將解析 YAML 檔案，取得必要的資料，並將其儲存為 `./outputs` 目錄中的 JSON 檔案。
4. 將`outputs` 產生出來的檔案複製到網站的 `src/data/` 中
5. 網站在建置時就會使用到

```sh
# 快速更新的指令
pnpm build.data && cp -r publiccode-parser/outputs/* src/data/
```
