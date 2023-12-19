import { firestore, storage } from './firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { collection, doc, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ファイルアップロード関数
export const upload = async () => {
  // アップロード結果を表示する要素を取得
  const uploadResult = document.getElementById("upload-result");

  try {
    // ファイルデータとファイル名を取得
    const fileData = document.getElementById("file-data").files[0];
    const fileName = document.getElementById("file-name").value;

    // Firestoreにメタデータを保存し、ドキュメントの参照を取得
    const docRef = await saveMetadata(fileName, fileData.type);
    // ファイルをFirebase Storageにアップロード
    await uploadFile(docRef.id, fileData);

    uploadResult.textContent = "ファイルのアップロードに成功しました。";
  } catch (error) {
    console.error("Error in file upload: ", error);
    uploadResult.textContent = "ファイルのアップロードに失敗しました。";
  }
};

// Firestoreにメタデータを保存する関数
async function saveMetadata(fileName, mimeType) {
  // 新しいドキュメントを作成し、ファイル名、MIMEタイプ、作成日を保存
  return await addDoc(collection(firestore, "files"), {
    name: fileName,
    mimeType: mimeType,
    createDate: new Date(),
  });
}

// Firebase Storageにファイルをアップロードする関数
async function uploadFile(docId, fileData) {
  // Storageの参照を作成
  const storageRef = ref(storage, "files/" + docId);
  // ファイルをアップロード
  await uploadBytes(storageRef, fileData);

  // ダウンロードURLを取得
  const downloadURL = await getDownloadURL(storageRef);
  // Firestoreのドキュメントを更新してダウンロードURLを保存
  await updateDoc(doc(firestore, "files", docId), {
    downloadURL: downloadURL
  });


  console.log("Uploaded a blob or file and metadata updated!");
}