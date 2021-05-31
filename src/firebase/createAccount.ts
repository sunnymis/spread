import firebase from "../firebase";

export default async function (email: string, password: string) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}
