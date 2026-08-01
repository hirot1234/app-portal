# UE16 Apps Portal

`app.ue16.cc` で公開する、UE16のWebアプリ一覧ポータルです。

## 構成

外部ライブラリを使わない静的サイトです。

- `index.html`: ページ構造
- `styles.css`: ダークテーマとレスポンシブ表示
- `app.js`: アプリデータ、検索、カテゴリーフィルター
- `vercel.json`: Vercel設定とセキュリティヘッダー

## アプリの追加・削除

`app.js` の `apps` 配列を編集します。各項目は `name`、`description`、`category`、`icon`、`url`、`theme` を持ちます。

## ローカル確認

```bash
python3 -m http.server 4173
```

ブラウザで `http://localhost:4173` を開きます。
