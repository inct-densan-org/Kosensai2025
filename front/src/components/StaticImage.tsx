/**
 * next/image の Image コンポーネントラッパー。
 * output: 'export' + basePath 環境で basePath が自動適用されない問題を回避するため、
 * src に basePath を手動でプリフィックスする。
 */
import NextImage, { type ImageProps } from "next/image";
import { prefixPath } from "../../next.config";

export default function Image({ src, ...rest }: ImageProps) {
    const prefixedSrc = typeof src === 'string' && src.startsWith('/') && !src.startsWith(prefixPath)
        ? `${prefixPath}${src}`
        : src;
    return <NextImage {...rest} src={prefixedSrc} />;
}
