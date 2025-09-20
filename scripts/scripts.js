const bkmrkDialog = document.querySelector('dialog');
const bkmrkDialogTitle = document.querySelector('dialog h2');
const bkmrkFormURL = document.querySelector('#bookmarkURL');
const bkmrkFormName = document.querySelector('#bookmarkName');
const bkmrkBtn = document.querySelector('#addBookmarkBtn');
const closeBkmrkDialogBtn = document.querySelector('#closeBookmarkDialogBtn');
const submitBkmrkDialogBtn = document.querySelector('#submitBookmarkDialogBtn');
const editBookmarkBtns = document.querySelectorAll('.editBookmarkBtn');

bkmrkBtn.addEventListener('click', (e) => {
  bkmrkDialogTitle.textContent = 'Add Bookmark';
  submitBkmrkDialogBtn.textContent = 'Add';
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    bkmrkFormURL.value = tabs[0].url;
    bkmrkFormName.value = tabs[0].title;
    bkmrkDialog.showModal();
  });
});

closeBkmrkDialogBtn.addEventListener('click', (e) => {
  bkmrkDialog.close();
});

function editBookmarkAction(e) {
  bkmrkDialogTitle.textContent = 'Edit Bookmark';
  submitBkmrkDialogBtn.textContent = 'Save';
  bkmrkDialog.showModal();
}

editBookmarkBtns.forEach((editBookmarkBtn) => {
  editBookmarkBtn.addEventListener('click', editBookmarkAction);
});
