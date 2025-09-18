const h1 = document.querySelector('h1');

console.log('Bookmarks Manager extension loaded');
console.log('h1: ', h1);

const addBookmarkDialog = document.querySelector('dialog');
const addBookmarkBtn = document.querySelector('#addBookmarkBtn');

addBookmarkBtn.addEventListener('click', (e) => {
  addBookmarkDialog.showModal();
});
