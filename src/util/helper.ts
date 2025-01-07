import axios from "axios";
import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";

export function formatDate(date: string) {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString([], options);
}

export async function uploadFile(file: File | null, uploading: boolean, setUploading: any) {
    if (!file || uploading) return;
    checkFileSize(file);

    setUploading(true);
    const toastID = toast.loading("Uploading image...");
    // Request a pre-signed URL from the backend
    const response = await axiosInstance.get(`/s3/generate-presigned-url?fileName=${file.name}&contentType=${file.type}`);
    const uploadURL = response.data.uploadURL;

    // Upload the file to S3 using the pre-signed URL
    axios.put(uploadURL, file, {
        headers: {
            "Content-Type": file.type,
        },
    }).then(() => {
        toast.success("Image uploded!");
    }).catch(() => {
        toast.error("Could not upload image.");
    }).finally(() => {
        toast.done(toastID);
    })
    // Return download URL to save in database.
    return response.data.downloadURL;
}

export function checkFileSize(file: File, maxFileSize: number = 5 * 1025 * 1024) { // 5MB
    if (file.size > maxFileSize) {
        const errorMessage = `File too big! Files must be less than ${formatBytes(maxFileSize)}.`
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
}

function formatBytes(bytes: number): string {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;

    while (bytes >= 1024 && unitIndex < units.length - 1) {
        bytes /= 1024;
        unitIndex++;
    }

    return `${Math.round(bytes)}${units[unitIndex]}`;
}