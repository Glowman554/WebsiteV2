import { UTApi } from "uploadthing/server";

let uploadthing: UTApi;

export function utInit() {
    uploadthing = new UTApi();
}

/**
 * Why won't your types work mister typescript youtuber?
 * Saying no javascript but fucking up your typescript types????
 *
 * nvm sorry just skill issue...
 */

export async function upload(blob: Blob, filename: string): Promise<string> {
    const result = await uploadthing.uploadFiles(
        new File([blob], filename),
    );

    if (result.error) {
        throw new Error(result.error.message);
    }

    return result.data.url;
}

export async function uploadUrl(url: string): Promise<string> {
    const result = await uploadthing.uploadFilesFromUrl(url);

    if (result.error) {
        throw new Error(result.error.message);
    }

    return result.data.url;
}
