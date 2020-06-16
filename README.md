# ogpng

Engineer 向け OGP シェアサービス

## 機能

- Editor で 画面を作れる
- 画面を画像として保存して OGP 化
- 認証

## TODO

- [ ] 基盤
  - [x] CI
  - [x] linter
  - [x] formatter
  - [x] tsc
  - [ ] SP 対応
  - [x] firebase 準備
    - [ ] auth(低)
    - [x] storage
    - [ ] store(低)
    - [x] analytics
  - [x] vercel
    - [x] deploy
    - [x] secrets
  - [x] Jest 設定
- [x] editor 画面
  - [x] monaco 埋め込み
  - [ ] コードから画面生成
    - [x] HTML
    - [ ] JS
    - [ ] JSX
  - [x] 画面から画像生成
  - [x] 画像の投稿
  - [ ] プラポリの表示
  - [ ] 規約の表示
- [ ] 生成画面
  - [x] 画像の表示
  - [ ] twitter share
- [ ] トップページ
  - [ ] サービス紹介
  - [ ] editor 埋め込み
- [ ] login 画面(低)
  - [ ] IPASS 認証(低)
  - [ ] 匿名ログイン(低)
  - [ ] GitHub 認証(低)
- [ ] マイページ(低)
  - [ ] 自分の投稿一覧を表示(低)
  - [ ] 自分の投稿を編集できる(低)
