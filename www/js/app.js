import { upload } from './upload.js';
import { search } from './search.js';
import { displayFileList } from './listFiles.js';
import { deleteSelectedFiles } from './deleteFiles.js';

// イベントリスナーの設定
window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("upload-button").addEventListener("click", upload);
  document.getElementById("search-button").addEventListener("click", search);
  document.getElementById("list-files-button").addEventListener("click", displayFileList);
  document.getElementById("delete-selected-button").addEventListener("click", deleteSelectedFiles);
});
