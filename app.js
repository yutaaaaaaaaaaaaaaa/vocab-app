const KEY = "vocab_words_v1";
let words = JSON.parse(localStorage.getItem(KEY) || "[]");
const $ = (s) => document.querySelector(s);
const view = $("#view");

// 初回ロード時
if (words.length === 0) {
  fetch("words.json")
    .then(r => r.json())
    .then(d => { words = d; save(); renderLearn(); });
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

// 単語一覧モード（削除ボタン付き）
function renderList() {
  if (words.length === 0) return view.innerHTML = "<p>単語がありません</p>";
  
  view.innerHTML = "<ul>" +
    words.map((w,i) => `<li>${w.en} - ${w.ja} <button data-index="${i}" class="delete">削除</button></li>`).join("") +
    "</ul>";

  // 削除ボタンにイベントを追加
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

// 単語追加モード
function renderAdd() {
  view.innerHTML = `
    <input id="en" placeholder="英語" />
    <input id="ja" placeholder="日本語" />
    <button id="add">追加</button>
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
}
