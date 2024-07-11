import { UTApi } from "uploadthing/server";

const uploadthing = new UTApi();

/**
 * Why won't your types work mister typescript youtuber?
 * Saying no javascript but fucking up your typescript types????
 */

export async function upload(blob: Blob, filename: string): Promise<string> {
    const result = await uploadthing.uploadFiles(
        new File([blob], filename),
    );

    if (result.error) {
        throw new Error(result.error.message);
    }

    return String(result.data.url);
}
