// カードデータ
const cardsData = {
    1: {
        title: "Interactive Text Animation",
        tag: "Featured",
        date: "2025-10-21",
        description: "マウスカーソルに反応するスクランブルテキストエフェクト",
        hasScramble: true
    },
    2: {
        title: "Modern UI Design",
        tag: "Design",
        date: "2025-10-20",
        description: "最新のUIデザイントレンドとベストプラクティス。ユーザー体験を向上させるためのデザイン手法について解説します。",
        hasScramble: false
    },
    3: {
        title: "GSAP Animation Guide",
        tag: "Development",
        date: "2025-10-19",
        description: "GSAPを使った高度なWebアニメーション実装。ScrollTrigger、Timeline、Tweenなどの機能を詳しく説明します。",
        hasScramble: false
    },
    4: {
        title: "CSS Grid Layouts",
        tag: "Tutorial",
        date: "2025-10-18",
        description: "レスポンシブなグリッドレイアウトの作り方。モダンなWebサイトに必要なレイアウトテクニックを学びます。",
        hasScramble: false
    },
    5: {
        title: "Web Performance Tips",
        tag: "Performance",
        date: "2025-10-17",
        description: "サイトパフォーマンスを最適化する実践的なテクニック。読み込み速度の改善とユーザー体験の向上方法を紹介します。",
        hasScramble: false
    },
    6: {
        title: "Advanced JavaScript",
        tag: "JavaScript",
        date: "2025-10-16",
        description: "JavaScriptの高度なテクニックとパターン。クロージャ、プロトタイプ、非同期処理などを深く理解します。",
        hasScramble: false
    }
};

// DOM要素
const modal = document.getElementById('modal');
const modalOverlay = modal.querySelector('.modal-overlay');
const closeModalBtn = document.getElementById('closeModal');
const cards = document.querySelectorAll('.card');

const modalTitle = document.getElementById('modalTitle');
const modalTag = document.getElementById('modalTag');
const modalDate = document.getElementById('modalDate');
const modalDescription = document.getElementById('modalDescription');
const textBlock = document.getElementById('textBlock');
const normalContent = document.getElementById('normalContent');

let currentSplitText = null;

// カードクリックイベント
cards.forEach(card => {
    card.addEventListener('click', () => {
        const cardId = card.getAttribute('data-id');
        openModal(cardId);
    });
});

// モーダルを開く
function openModal(cardId) {
    const data = cardsData[cardId];

    // モーダルのコンテンツを設定
    modalTitle.textContent = data.title;
    modalTag.textContent = data.tag;
    modalDate.textContent = data.date;
    modalDescription.textContent = data.description;

    // スクランブルテキストの表示/非表示を切り替え
    if (data.hasScramble) {
        textBlock.style.display = 'block';
        normalContent.style.display = 'none';

        // 前のSplitTextインスタンスをクリーンアップ
        if (currentSplitText) {
            currentSplitText.revert();
        }

        // スクランブルテキストアニメーションを初期化
        setTimeout(() => {
            initScrambleText();
        }, 100);
    } else {
        textBlock.style.display = 'none';
        normalContent.style.display = 'block';
    }

    // モーダルを表示
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// モーダルを閉じる
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';

    // SplitTextをクリーンアップ
    if (currentSplitText) {
        currentSplitText.revert();
        currentSplitText = null;
    }

    // イベントリスナーを削除
    textBlock.onpointermove = null;
}

// スクランブルテキストアニメーションの初期化
function initScrambleText() {
    // SplitTextプラグインが利用可能か確認
    if (typeof SplitText === 'undefined') {
        console.error('SplitText plugin is not loaded');
        return;
    }

    const paragraph = textBlock.querySelector('p');

    if (!paragraph) {
        console.error('Paragraph not found in text block');
        return;
    }

    // テキストを文字単位で分割
    currentSplitText = new SplitText(paragraph, {
        type: "chars",
        charsClass: "char"
    });

    // 各文字にdata-content属性を設定
    currentSplitText.chars.forEach((char) => {
        gsap.set(char, {
            attr: { "data-content": char.innerHTML }
        });
    });

    // ポインター移動時のアニメーション
    textBlock.onpointermove = (e) => {
        currentSplitText.chars.forEach((char) => {
            const rect = char.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // 距離が100px以内の文字にスクランブルアニメーションを適用
            if (dist < 100) {
                gsap.to(char, {
                    overwrite: true,
                    duration: 1.2 - dist / 100,
                    scrambleText: {
                        text: char.dataset.content,
                        chars: ".:",
                        speed: 0.5,
                    },
                    ease: 'none'
                });
            }
        });
    };
}

// モーダルを閉じるイベント
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// カードの入場アニメーション
gsap.from('.card', {
    duration: 0.8,
    opacity: 0,
    y: 50,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.2
});

// タイトルのアニメーション
gsap.from('.page-title', {
    duration: 1,
    opacity: 0,
    y: -30,
    ease: 'power3.out'
});
