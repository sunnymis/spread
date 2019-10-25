import firebase from 'firebase';

export default function(dispatch, action) {
  const { onSuccess } = action.meta;
  const userId = localStorage.getItem('spreadUserId');
  const docId = action.meta.docId;
  let images = [];

  firebase
    .storage()
    .ref(`images/users/${userId}/${docId}`)
    .listAll()
    .then(data => {
      data.items.forEach(file => {
        file.getDownloadURL().then(url => {
          images = [...images, url];
          onSuccess(images);
        });
      });
    });
}
