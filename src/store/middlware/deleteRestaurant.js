import firebase from 'firebase';

export default function(dispatch, action) {
  const { onSuccess } = action.meta;
  const docId = action.meta.docId;

  firebase
    .firestore()
    .collection('restaurants')
    .doc(docId)
    .delete()
    .then(() => {
      console.log('deleted', docId);
      onSuccess();
    });
}
