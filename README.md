# GSAP Card Animation Demo

GSAPのスクランブルテキストエフェクトを使用したブログカードのデモプロジェクトです。

## 特徴

- **グリッドレイアウト**: レスポンシブなカードグリッド表示
- **インタラクティブモーダル**: カードクリックで詳細表示
- **スクランブルテキスト**: マウスカーソルに反応する文字アニメーション（Card 1）
- **スムーズなアニメーション**: GSAP による洗練されたトランジション

## 使用技術

- HTML5
- CSS3 (Grid Layout, Flexbox, Custom Properties)
- JavaScript (ES6+)
- [GSAP 3.12.5](https://greensock.com/gsap/)
  - SplitText Plugin
  - ScrambleText Plugin

## デモの動作

### カードグリッド
- 6枚のブログカードがグリッド形式で表示されます
- カードにホバーすると浮き上がるアニメーション
- カードをクリックすると詳細モーダルが開きます

### スクランブルテキストアニメーション（Card 1専用）
- 最初のカード「Interactive Text Animation」をクリック
- モーダル内のテキストにマウスカーソルを近づける
- カーソルから100px以内の文字がスクランブル効果でアニメーション
- 距離に応じてアニメーション速度が変化

### その他のカード
- 通常のコンテンツ表示
- スクランブルアニメーションなし

## ファイル構成

```
/home/user/investigation/
├── index.html      # メインHTML
├── styles.css      # スタイルシート
├── script.js       # JavaScript（アニメーションロジック）
└── README.md       # このファイル
```

## 使い方

1. **ブラウザで開く**
   ```bash
   # 任意のHTTPサーバーで起動
   # 例: Python
   python -m http.server 8000

   # 例: Node.js (http-server)
   npx http-server
   ```

2. **ブラウザでアクセス**
   ```
   http://localhost:8000
   ```

3. **操作方法**
   - カードをクリックして詳細を表示
   - Card 1（紫色のグラデーション）でスクランブル効果を確認
   - モーダル内のテキストにマウスを動かす
   - ESCキーまたは×ボタンでモーダルを閉じる

## カスタマイズ

### 新しいカードを追加

**HTML** (`index.html`)
```html
<article class="card" data-id="7">
    <div class="card-image" style="background: linear-gradient(...);">
        <span class="card-tag">Tag Name</span>
    </div>
    <div class="card-content">
        <h2 class="card-title">Card Title</h2>
        <p class="card-description">Description...</p>
        <span class="card-date">2025-10-21</span>
    </div>
</article>
```

**JavaScript** (`script.js`)
```javascript
const cardsData = {
    // ...
    7: {
        title: "New Card",
        tag: "Tag",
        date: "2025-10-21",
        description: "Description...",
        hasScramble: false  // true にするとスクランブル効果が有効
    }
};
```

### スクランブルアニメーションの調整

`script.js` の `initScrambleText()` 関数内：

```javascript
// 反応距離を変更（デフォルト: 100px）
if (dist < 150) { // 150pxに拡大

// アニメーション速度を変更
duration: 1.5 - dist / 150,

// スクランブル文字を変更
chars: "!@#$%",  // デフォルト: ".:"

// スクランブル速度を変更
speed: 1.0,  // デフォルト: 0.5
```

## ブラウザ対応

- Chrome (推奨)
- Firefox
- Safari
- Edge

## 注意事項

- **GSAP プラグイン**: SplitTextとScrambleTextはGSAPのプレミアムプラグインですが、CDN経由で無料で使用できます
- **パフォーマンス**: ポインター移動イベントは高頻度で発生するため、大量の文字には最適化が必要な場合があります

## ライセンス

このデモプロジェクトはMITライセンスです。
GSAP自体のライセンスについては[GreenSock](https://greensock.com/licensing/)を参照してください。

## 参考

- [GSAP Documentation](https://greensock.com/docs/)
- [SplitText Plugin](https://greensock.com/docs/v3/Plugins/SplitText)
- [ScrambleText Plugin](https://greensock.com/docs/v3/Plugins/ScrambleTextPlugin)
