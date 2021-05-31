import firebase from "../firebase";

export default function () {
  return localStorage.getItem("spreadUserId") || "";
}
