import firebase from "../firebase";
import getCurrentUser from "../util/getCurrentUser";

export default function (docId: string) {
  firebase
    .firestore()
    .collection(`restaurants/users/${getCurrentUser()}`)
    .doc(docId)
    .delete()
    .then(() => {
      console.log("deleted", docId);
    });
}
