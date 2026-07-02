// 例: hooks/useIsSameOrigin.ts
"use client"; // クライアントで実行されることを明示

import { useState, useEffect } from 'react';

export const useIsSameOrigin = () => {
    // 初期値は null にして、判定が完了するまで待てるようにする（ハイドレーションエラー対策）
    const [isSameOrigin, setIsSameOrigin] = useState<boolean | null>(null);

    useEffect(() => {
        const referer = document.referrer;
        const currentHost = window.location.host;

        // refererが存在し、かつ現在のホスト名が含まれているか判定
        if (referer && referer.includes(currentHost)) {
            setIsSameOrigin(true);
        } else {
            setIsSameOrigin(false);
        }
    }, []);

    return isSameOrigin;
};