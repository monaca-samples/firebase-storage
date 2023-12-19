// Firebaseの設定と関連するモジュールをインポート
import { firestore, storage } from './firebaseConfig.js';
import { ref, deleteObject } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { displayFileList } from './listFiles.js';

// 選択されたファイルを削除する関数
export const deleteSelectedFiles = async () => {
  // チェックボックスがチェックされているものを全て取得
  const checkedBoxes = document.querySelectorAll(
    "#files-list input[type='checkbox']:checked"
  );

  // 各チェックボックスに対して
  for (const checkbox of checkedBoxes) {
    // ドキュメントIDを取得
    const docId = checkbox.value;
    // ファイルを削除
    await deleteFile(docId);
  }

  // ファイル一覧を再表示
  displayFileList();
};

// FirestoreとFirebase Storageからファイルを削除する関数
async function deleteFile(docId) {
  try {
    // Firestoreかドキュメントを削除
    const docRef = doc(firestore, "files", docId);
    await deleteDoc(docRef);

    // Firebase Storageからファイルを削除
    const storageRef = ref(storage, "files/" + docId);
    await deleteObject(storageRef);

    console.log(`File deleted: ${docId}`);
  } catch (error) {
    console.error(`Error deleting file: ${docId}`, error);
  }
}
