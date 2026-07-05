// Custom image loader for static export with basePath
// next/image's automatic basePath prefixing doesn't work correctly
// with output: 'export', so we manually prepend it here.

const BASE_PATH = "/archive/2025";

export default function staticExportLoader({ src }: { src: string }) {
    // If src already starts with basePath or is an external URL, return as-is
    if (src.startsWith(BASE_PATH) || src.startsWith('http://') || src.startsWith('https://')) {
        return src;
    }
    // Prepend basePath for local images
    if (src.startsWith('/')) {
        return `${BASE_PATH}${src}`;
    }
    return src;
}
