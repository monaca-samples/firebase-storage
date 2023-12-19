// Firebase Firestoreから必要な関数をインポート
import { firestore } from './firebaseConfig.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ファイル検索関数
export const search = async () => {
  try {
    // 検索キーワードを取得
    const keyword = document.getElementById("search-keyword").value;
    // 検索結果を表示する要素を取得
    const searchResults = document.getElementById("search-results");
    // 検索結果をクリア
    searchResults.innerHTML = "";

    // Firestoreからキーワードに一致するドキュメントを検索
    const querySnapshot = await getDocs(
      query(collection(firestore, "files"), where("name", "==", keyword))
    );

    // 検索結果がない場合
    if (querySnapshot.empty) {
      searchResults.textContent = "検索結果が見つかりませんでした。";
    } else {
      querySnapshot.forEach((doc) => {
        // 検索結果の項目を生成し、結果リストに追加
        searchResults.innerHTML += createSearchResultItem(doc.data());
      });
    }
  } catch (error) {
    console.error("Error searching files: ", error);
  }
};

// 検索結果の項目を生成する関数
function createSearchResultItem(data) {
  const createDate = data.createDate.toDate().toLocaleDateString("ja-JP");
  // メディアタイプに応じて表示するタグを決定
  const mediaTag = data.mimeType.startsWith("image/")
    ? `<img src="${data.downloadURL}" style="width: 100px;">` // 画像の場合
    : data.mimeType.startsWith("video/")
      ? `<video src="${data.downloadURL}" controls style="width: 300px;"></video>` // ビデオの場合
      : ""; // それ以外の場合

  return `
    <li>
      ${mediaTag}
      ファイル名: ${data.name}, MIMEタイプ: ${data.mimeType}, 作成日: ${createDate}
    </li>
  `;
}
