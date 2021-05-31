import firebase from "../firebase";

export default async function (email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}
