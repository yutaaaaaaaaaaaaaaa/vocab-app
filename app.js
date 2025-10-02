const KEY = "vocab_words_v1";
let words = JSON.parse(localStorage.getItem(KEY) || "[]");
const $ = (s) => document.querySelector(s);
const view = $("#view");

// サンプル100問
const sampleWords = [
  { en: "apple", ja: "りんご" }, { en: "book", ja: "本" }, { en: "cat", ja: "猫" }, { en: "dog", ja: "犬" },
  { en: "elephant", ja: "象" }, { en: "fish", ja: "魚" }, { en: "grape", ja: "ぶどう" }, { en: "hat", ja: "帽子" },
  { en: "ice", ja: "氷" }, { en: "juice", ja: "ジュース" }, { en: "kite", ja: "凧" }, { en: "lemon", ja: "レモン" },
  { en: "moon", ja: "月" }, { en: "night", ja: "夜" }, { en: "orange", ja: "オレンジ" }, { en: "pen", ja: "ペン" },
  { en: "queen", ja: "女王" }, { en: "rose", ja: "バラ" }, { en: "sun", ja: "太陽" }, { en: "tree", ja: "木" },
  { en: "umbrella", ja: "傘" }, { en: "vase", ja: "花瓶" }, { en: "water", ja: "水" }, { en: "xylophone", ja: "木琴" },
  { en: "yellow", ja: "黄色" }, { en: "zebra", ja: "シマウマ" }, { en: "air", ja: "空気" }, { en: "bread", ja: "パン" },
  { en: "car", ja: "車" }, { en: "door", ja: "ドア" }, { en: "egg", ja: "卵" }, { en: "forest", ja: "森" },
  { en: "glass", ja: "ガラス" }, { en: "house", ja: "家" }, { en: "island", ja: "島" }, { en: "jacket", ja: "上着" },
  { en: "key", ja: "鍵" }, { en: "lion", ja: "ライオン" }, { en: "mountain", ja: "山" }, { en: "nest", ja: "巣" },
  { en: "ocean", ja: "海" }, { en: "pencil", ja: "鉛筆" }, { en: "river", ja: "川" }, { en: "star", ja: "星" },
  { en: "table", ja: "テーブル" }, { en: "violin", ja: "バイオリン" }, { en: "window", ja: "窓" }, { en: "x-ray", ja: "レントゲン" },
  { en: "yogurt", ja: "ヨーグルト" }, { en: "zoo", ja: "動物園" }, { en: "ant", ja: "アリ" }, { en: "ball", ja: "ボール" },
  { en: "candle", ja: "ろうそく" }, { en: "desk", ja: "机" }, { en: "ear", ja: "耳" }, { en: "fan", ja: "扇風機" },
  { en: "garden", ja: "庭" }, { en: "ink", ja: "インク" }, { en: "jar", ja: "瓶" }, { en: "knife", ja: "ナイフ" },
  { en: "lamp", ja: "ランプ" }, { en: "mirror", ja: "鏡" }, { en: "neck", ja: "首" }, { en: "plane", ja: "飛行機" },
  { en: "quilt", ja: "掛け布団" }, { en: "ring", ja: "指輪" }, { en: "sock", ja: "靴下" }, { en: "tent", ja: "テント" },
  { en: "uniform", ja: "制服" }, { en: "village", ja: "村" }, { en: "whale", ja: "鯨" }, { en: "yarn", ja: "毛糸" },
  { en: "zipper", ja: "ファスナー" }, { en: "axe", ja: "斧" }, { en: "cloud", ja: "雲" }, { en: "fire", ja: "火" },
  { en: "grass", ja: "草" }, { en: "hill", ja: "丘" }, { en: "ice2", ja: "氷2" }, { en: "jungle", ja: "ジャングル" },
  { en: "king", ja: "王" }, { en: "leaf", ja: "葉" }, { en: "owl", ja: "フクロウ" }, { en: "pig", ja: "豚" },
  { en: "rain", ja: "雨" }, { en: "snake", ja: "蛇" }, { en: "volcano", ja: "火山" }, { en: "wolf", ja: "オオカミ" },
  { en: "boat", ja: "ボート" }, { en: "cup", ja: "カップ" }, { en: "frog", ja: "カエル" }, { en: "gate", ja: "門" },
  { en: "jug", ja: "水差し" }, { en: "mat", ja: "マット" }, { en: "net", ja: "ネット" }, { en: "pan", ja: "鍋" },
  { en: "quill", ja: "羽ペン" }, { en: "rope", ja: "ロープ" }, { en: "stone", ja: "石" }, { en: "urn", ja: "壺" }
];

// 初回ロード
if (words.length === 0) {
  addRandomWords(10); // 最初に10問自動追加
  renderLearn();
} else {
  renderLearn();
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(words));
}

$("#modeLearn").onclick = renderLearn;
$("#modeList").onclick = renderList;
$("#modeAdd").onclick = renderAdd;

// 学習モード
function renderLearn() {
  if (words.length === 0) return view.innerHTML = "<p>単語がありません</p>";
  const q = words[Math.floor(Math.random() * words.length)];
  view.innerHTML = `
    <h2>${q.en}</h2>
    <input id="answer" placeholder="答えは？" />
    <button id="check">答え合わせ</button>
    <p id="result"></p>
  `;
  $("#check").onclick = () => {
    const ans = $("#answer").value.trim().toLowerCase();
    const ok = ans === q.ja.toLowerCase();
    $("#result").textContent = ok ? "✅ 正解" : `❌ 正解は ${q.ja}`;
  };
}

// 単語一覧（削除ボタン付き）
function renderList() {
  if (words.length === 0) return view.innerHTML = "<p>単語がありません</p>";
  view.innerHTML = "<ul>" +
    words.map((w,i) => `<li>${w.en} - ${w.ja} <button data-index="${i}" class="delete">削除</button></li>`).join("") +
    "</ul>";
  document.querySelectorAll(".delete").forEach(btn => {
    btn.onclick = () => {
      const index = parseInt(btn.dataset.index);
      if (confirm(`"${words[index].en}" を削除しますか？`)) {
        words.splice(index, 1);
        save();
        renderList();
      }
    };
  });
}

// 単語追加モード（手動と自動10問追加）
function renderAdd() {
  view.innerHTML = `
    <input id="en" placeholder="英語" />
    <input id="ja" placeholder="日本語" />
    <button id="add">追加</button>
    <button id="add10">自動10問追加</button>
  `;
  $("#add").onclick = () => {
    const en = $("#en").value.trim();
    const ja = $("#ja").value.trim();
    if (!en || !ja) return alert("両方入力してください");
    words.push({ en, ja });
    save();
    alert("追加しました");
    renderList();
  };
  $("#add10").onclick = () => addRandomWords(10);
}

// ランダムに n 問追加
function addRandomWords(n) {
  const remaining = sampleWords.filter(sw => !words.some(w => w.en === sw.en));
  if (remaining.length === 0) return alert("追加できる単語はもうありません");

  const toAdd = [];
  for (let i = 0; i < n && remaining.length > 0; i++) {
    const idx = Math.floor(Math.random() * remaining.length);
    toAdd.push(remaining[idx]);
    remaining.splice(idx, 1);
  }

  words = words.concat(toAdd);
  save();
  alert(`${toAdd.length}問を追加しました`);
  renderList();
}
