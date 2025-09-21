import storageManager from './storageManager.js';

const bkmrkDialog = document.querySelector('dialog');
const bkmrkDialogTitle = document.querySelector('dialog h2');
const bkmrkFormURL = document.querySelector('#bookmarkURL');
const bkmrkFormName = document.querySelector('#bookmarkName');
const bkmrkBtn = document.querySelector('#addBookmarkBtn');
const closeBkmrkDialogBtn = document.querySelector('#closeBookmarkDialogBtn');
const submitBkmrkDialogBtn = document.querySelector('#submitBookmarkDialogBtn');
const bkmrkForm = document.querySelector('#bookmarkForm');
const editBookmarkBtns = document.querySelectorAll('.editBookmarkBtn');
const bkmrkList = document.querySelector('#listOfBookmarks');

/**
 * Adds a li element with the provided parameters and inserts its into the DOM
 * @param {string} name The link name to create the item with
 * @param {string} url The link url to create the item with
 */
function addItemHTML(name, url) {
  // Main li
  const mainLi = document.createElement('li');
  // Item name and url
  const bookmarkTextDiv = document.createElement('div');
  bookmarkTextDiv.className = 'bookmarkText';
  bookmarkTextDiv.innerHTML = name + ' - ' + url;
  // Bookmark Icons
  const bookmarkIcons = document.createElement('div');
  bookmarkIcons.className = 'bookmarkIcons';
  // Edit bookmark
  const editBookmarkLink = document.createElement('a');
  editBookmarkLink.href = '#';
  editBookmarkLink.className = 'editBookmarkBtn';
  editBookmarkLink.addEventListener('click', showEditBkmrkModal);
  // Delete bookmark
  const deleteBookmarkLink = document.createElement('a');
  deleteBookmarkLink.href = '#';
  deleteBookmarkLink.className = 'deleteBookmarkBtn';
  deleteBookmarkLink.addEventListener('click', deleteBookmark);

  // Assemble everything
  bookmarkIcons.appendChild(editBookmarkLink);
  bookmarkIcons.appendChild(deleteBookmarkLink);
  mainLi.appendChild(bookmarkTextDiv);
  mainLi.appendChild(bookmarkIcons);

  bkmrkList.appendChild(mainLi);
}

function deleteBookmark(e) {}

function addEditBookmark(e) {
  e.preventDefault();
  if (bkmrkDialogTitle.textContent.includes('Add')) {
    console.log('Add bookmark');
  } else {
    console.log('Edit bookmark');
  }
}

function showAddBkmrkModal(e) {
  bkmrkDialogTitle.textContent = 'Add Bookmark';
  submitBkmrkDialogBtn.textContent = 'Add';
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    bkmrkFormURL.value = tabs[0].url;
    bkmrkFormName.value = tabs[0].title;
    bkmrkDialog.showModal();
  });
}

function showEditBkmrkModal(e) {
  bkmrkDialogTitle.textContent = 'Edit Bookmark';
  submitBkmrkDialogBtn.textContent = 'Save';
  bkmrkDialog.showModal();
}

closeBkmrkDialogBtn.addEventListener('click', (e) => {
  bkmrkDialog.close();
});
editBookmarkBtns.forEach((editBookmarkBtn) => {
  editBookmarkBtn.addEventListener('click', showEditBkmrkModal);
});
bkmrkBtn.addEventListener('click', showAddBkmrkModal);
bkmrkForm.addEventListener('submit', addEditBookmark);
