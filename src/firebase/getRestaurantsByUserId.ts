import firebase from "../firebase";

export default async function (id: string): Promise<any> {
  const snapshot = await firebase.firestore().collection(`restaurants/users/${id}`).get();

  const snaps = snapshot.docs.map((r) => {
    const data = r.data() as Restaurant;

    return {
      ...data,
      docId: r.id,
    };
  });

  return snaps;
}
