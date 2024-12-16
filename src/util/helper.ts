import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../firebase";
import { v4 } from "uuid";

export function formateDate(date: string) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString([], options);
}

export  async function uploadFile(file: File | null, uploading: boolean, setUploading: any){

    if (!file || uploading) return;

    setUploading(true);

    const imageRef = ref(storage, `images/${file.name + v4()}`);
    const res = await uploadBytes(imageRef, file);

    const downloadURL = await getDownloadURL(ref(storage, res.metadata.fullPath))
    return downloadURL;
}