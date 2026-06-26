import { useEffect, useState, useRef } from 'react';

// 元の画像サイズ（アンカーポイント計算の基準値）
const BASE_WIDTH = 700;
const BASE_HEIGHT = 530;

const ANCHORS = [
    {x: 117, y: 100, lat: 38.923105938451066, lng: 141.1052494975393},
    {x: 497, y: 184, lat: 38.92551214286872, lng: 141.10607342991662},
    {x: 212, y: 469, lat: 38.923679737563546, lng: 141.10821709071854},
];

function latLngToRatio(lat: number, lng: number) {
    const [p1, p2, p3] = ANCHORS;
    const dLat1 = p2.lat - p1.lat;
    const dLng1 = p2.lng - p1.lng;
    const dLat2 = p3.lat - p1.lat;
    const dLng2 = p3.lng - p1.lng;
    const dLat = lat - p1.lat;
    const dLng = lng - p1.lng;

    const det = dLat1 * dLng2 - dLat2 * dLng1;
    if (det === 0) return null;

    const u = (dLat * dLng2 - dLat2 * dLng) / det;
    const v = (dLat1 * dLng - dLat * dLng1) / det;

    const px = p1.x + u * (p2.x - p1.x) + v * (p3.x - p1.x);
    const py = p1.y + u * (p2.y - p1.y) + v * (p3.y - p1.y);

    return {
        xRatio: (px / BASE_WIDTH) * 100,
        yRatio: (py / BASE_HEIGHT) * 100,
    };
}

export function useCampusGps(isEnabled: boolean) {
    const [currentPos, setCurrentPos] = useState<{ xRatio: number; yRatio: number } | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [permission, setPermission] = useState<PermissionState | 'loading'>('loading');

    // watchIdをStateではなくRefで管理し、再レンダリングによる意図しないクリアを防ぐ
    const watchIdRef = useRef<number | null>(null);

    // 初回の権限チェックのみを行う（Firefox対策：onchangeで過剰に状態を上書きしない）
    useEffect(() => {
        if (!isEnabled || !navigator.geolocation) {
            if (isEnabled) setErrorMsg('お使いのブラウザは位置情報に対応していません。');
            return;
        }

        navigator.permissions?.query({ name: 'geolocation' as PermissionName })
            .then((status) => {
                setPermission(status.state);
                // 既に許可済みの場合は自動的に監視を開始する
                if (status.state === 'granted') {
                    startWatching();
                }
            })
            .catch(() => {
                setPermission('loading');
            });

        // アンマウント時のみ監視をクリア
        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, [isEnabled]); // 依存配列から permission を外す

    // GPS監視を開始する関数
    const startWatching = () => {
        if (watchIdRef.current !== null) return; // 既に監視中の場合は何もしない

        watchIdRef.current = navigator.geolocation.watchPosition(
            (position) => {
                setPermission('granted'); // 取得成功時に確実なステータスへ更新
                const { latitude, longitude } = position.coords;
                const ratio = latLngToRatio(latitude, longitude);
                if (ratio) setCurrentPos(ratio);
            },
            (err) => {
                if (err.code === err.PERMISSION_DENIED) {
                    setPermission('denied');
                } else {
                    setErrorMsg('位置情報の取得に失敗しました。');
                }
                // エラー時は監視をリセット
                if (watchIdRef.current !== null) {
                    navigator.geolocation.clearWatch(watchIdRef.current);
                    watchIdRef.current = null;
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const requestLocation = () => {
        // getCurrentPositionを挟まず、直接watchPositionをトリガーする
        startWatching();
    };

    return { currentPos, permission, errorMsg, requestLocation };
}