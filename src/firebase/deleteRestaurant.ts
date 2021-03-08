import firebase from "../firebase";

export default function (docId: string) {
  firebase
    .firestore()
    .collection("restaurants/users/n23qMAUSzDR5GcPgQmlarnK0Ok43")
    .doc(docId)
    .delete()
    .then(() => {
      console.log("deleted", docId);
    });
}
