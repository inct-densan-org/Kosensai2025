"use client";
import { useState, useEffect } from 'react';

export const useIsFirstVisit = () => {
    const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (hasVisited) {
            setIsFirstVisit(false); // 2回目以降
        } else {
            setIsFirstVisit(true); // 初回アクセス
            sessionStorage.setItem('hasVisited', 'true');
        }
    }, []);

    return isFirstVisit;
};