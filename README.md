shao.jp
=======

https://shao.jp/ のサイトです。

S3 にプッシュして公開します。(SSL化のためにCloudFrontを噛ましてます)

# 開発環境

- node.js (v5.6.0 以降)
- npm

```
$ git clone https://github.com/shao1555/shao.jp.git
$ cd shao.jp
$ npm install
$ $(npm bin)/gulp watch
```

src/ 以下を watch してます。CSS / HTML (Jade) などを編集してください。

# 公開

開発環境の手順が終了していることを前提とします。

```
# .env ファイルで AWS のトークン類を設定する
$ cp .env.example .env
$ vim .env
$ $(npm bin)/gulp upload
```

# License

CC BY-ND 4.0

