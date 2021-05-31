import firebase from "../firebase";

export default async function () {
  return firebase.auth().signOut();
}
