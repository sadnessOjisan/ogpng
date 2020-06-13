import Firebase from "../infrastructure/Firebase";
import CLOUD_STORAGE_KEYS from "../constatns/cloudStorageKeys";

export const saveOgp = (
  documentId: string,
  image: any
): Promise<{ e: any }> => {
  const storage = Firebase.instance.storage;
  const storageRef = storage.ref();
  const ogpRef = storageRef.child(`${CLOUD_STORAGE_KEYS.OGP}/${documentId}`);
  return ogpRef
    .put(image)
    .then((snapshot) => {
      console.log("snapshot", snapshot);
    })
    .catch((e) => {
      console.log("ERROR", e);
      return { e };
    });
};

export const getOgpUrl = (documentId: string) => {
  const storage = Firebase.instance.storage;
  const pathReferenceRef = storage.ref(
    `${CLOUD_STORAGE_KEYS.OGP}/${documentId}`
  );
  return pathReferenceRef
    .getDownloadURL()
    .then((url: string) => url)
    .catch((e) => console.log("ERROR", e));
};
