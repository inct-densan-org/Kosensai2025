"use client";

import React, { useEffect } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidthClass?: string; // 2.1.6 画面サイズに合わせた拡張用 (デフォルト: max-w-2xl)
};

const Modal = ({
                   isOpen,
                   onClose,
                   title,
                   children,
                   maxWidthClass = "max-w-2xl",
               }: ModalProps) => {
    // ESCキーの監視とスクロールロックの制御
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark/60 px-4 py-8"
            role="presentation"
            onClick={onClose}
        >
            <section
                className={`max-h-full w-full ${maxWidthClass} overflow-hidden rounded bg-white shadow-lg`}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(event) => event.stopPropagation()}
            >
                {/* ヘッダー部分 */}
                <header className="flex items-center justify-between border-b border-primary-lite2 px-5 py-4">
                    <h2 className="text-[18px] font-bold leading-normal text-dark ">
                        {title}
                    </h2>
                    <button
                        type="button"
                        className="rounded px-2 py-1 text-[20px] leading-none text-dark transition-colors hover:bg-primary-lite2"
                        aria-label="閉じる"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </header>

                {/* コンテンツ挿入部分 */}
                <div className="max-h-[70vh] overflow-y-auto px-5 py-5 scrollbar-none">
                    {children}
                </div>
            </section>
        </div>
    );
};

export default Modal;