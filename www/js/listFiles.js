import { firestore } from './firebaseConfig.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ファイル一覧を表示する関数
export const displayFileList = async () => {
  const filesList = document.getElementById("files-list");
  filesList.innerHTML = ""; // 一覧をクリア

  try {
    // Firestoreから"files"コレクションのドキュメントを取得
    const querySnapshot = await getDocs(collection(firestore, "files"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // テンプレートリテラルを使用してリストアイテムを作成
      const listItem = `
        <li>
          <input type="checkbox" value="${doc.id}"> ${data.name}
        </li>
      `;
      // innerHTMLを使用してリストアイテムを追加
      filesList.innerHTML += listItem;
    });
  } catch (error) {
    console.error("Error listing files: ", error);
  }
};