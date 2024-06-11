# code-gov-tw

## 簡介

本專案為公共程式平臺（code.gov.tw）的原始碼

主旨為促進民間或政府單位需要了解或使用公共程式的人，方便查閱公共程式的相關資訊而建立的平臺。

## 安裝指南

需具備 NodeJS 版本 18 以上的環境，執行下列指令複製專案及安裝必須的套件。

```shell
git clone https://github.com/moda-gov-tw/code-gov-tw.git # 複製本專案原始碼
cd code-gov-tw
# 需安裝 pnpm
pnpm install # 從網路下載所需的套件
```

初次下載完本專後，需要先建立專案一覽與篩選器所需要的資料(位於 publiccode-parser/projects)

```shell
pnpm build.data
```

接著使用下列指令開啟網站後，正常會開啟一個瀏覽器並連到[網站首頁](http://localhost:5173/)。沒有自動啟動的話也可以看指令顯示的網址自行連線。接著就可以開始瀏覽目前網站現有的內容

```shell
pnpm start
```

## 使用範例

瀏覽下列的頁面

- `首頁`與從選單進入的`認識公共程式`及`未來規劃頁面`頁面，說明 `公共程式` 是什麼樣的東西? 如何運作以及未來會如何發展
- `公共程式一覽`頁面，顯示現有收錄的公共程式專案並提供篩選功能
- 支援國際化 (internationalization) 功能。從自動產生的字典檔快速新增翻譯
- 支援從 publiccode.yml 標準管理公共程式一覽的專案清單

## 如何貢獻

如果您想要為這個專案貢獻，請查閱[CONTRIBUTING.md](/CONTRIBUTING.md)。

## 資訊安全問題

如果您發現本平台存在資訊安全問題，請查閱[SECURITY.md](/SECURITY.md)。

## 授權

© [作者與貢獻者](/AUTHORS.md)

此專案程式碼採用 MIT 授權。詳細內容請查閱[LICENSE.md](/LICENSE.md)。
此專案文件採用 CC0 授權。
