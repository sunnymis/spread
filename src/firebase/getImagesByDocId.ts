import { isEmpty } from "lodash";
import firebase from ".";

export default async function (docId: string): Promise<any> {
  const ref = `images/users/n23qMAUSzDR5GcPgQmlarnK0Ok43/${docId}`;

  firebase.storage().ref().child(ref).listAll();
  const images = await firebase.storage().ref().child(ref).listAll();
  if (isEmpty(images.items)) {
    return [];
  }

  const imageUrls = Promise.all(
    images.items.map((imageReference) => {
      return imageReference.getDownloadURL();
    })
  );

  return imageUrls;
}
