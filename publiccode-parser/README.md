# publiccode-parser

此腳本用於解析指定目錄中的 YAML 檔案，從中取出特定資料，然後將該資料整理並儲存為 JSON 檔案。

## 入門

以下指示將幫助您在本地機器上獲取並運行該專案副本，用於開發和測試目的。

### 先決條件

- 您的本地機器上安裝了 Node.js 版本 18 以上。
- 在您的專案中或全域安裝了 TypeScript。您可以使用以下 npm 命令進行安裝：`npm install -g typescript`

### 安裝

1. 複製 code-gov-tw 專案到您的本地機器。
2. 進入到專案根目錄。
3. 運行 `npm install` 來安裝必要的依賴項。

### 使用方式

1. 將您的 YAML 檔案放置在 `publiccode-parser/projects` 目錄中。
2. 使用命令 `npx tsx publiccode-parser/main.ts` 運行腳本。
3. 腳本將解析 YAML 檔案，取得必要的資料，並將其儲存為 `./outputs` 目錄中的 JSON 檔案。
4. 將此檔案覆蓋網站的 `src/data/filters.json` 與 `src/data/filters.json` 即可。

```sh
# 快速更新的指令
npx tsx publiccode-parser/main.ts && cp -r publiccode-parser/outputs/* src/data
```
