import { useEffect, useState } from 'react';

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

    // 画像サイズに対するパーセンテージ (0-100) に変換
    return {
        xRatio: (px / BASE_WIDTH) * 100,
        yRatio: (py / BASE_HEIGHT) * 100,
    };
}

export function useCampusGps(isEnabled: boolean) {
    const [currentPos, setCurrentPos] = useState<{ xRatio: number; yRatio: number } | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    
    const [permission, setPermission] = useState<PermissionState | 'loading'>('loading');

    useEffect(() => {
        if (!isEnabled || !navigator.geolocation) {
            if (isEnabled) setErrorMsg('お使いのブラウザは位置情報に対応していません。');
            return;
        }
        
        navigator.permissions.query({ name: 'geolocation' as PermissionName })
            .then((status) => {
                setPermission(status.state);
                
                status.onchange = () => {
                    setPermission(status.state);
                };
            })
            .catch(() => {
                setPermission('loading');
            });
        if (permission !== 'granted') return;
        
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const ratio = latLngToRatio(latitude, longitude);
                if (ratio) setCurrentPos(ratio);
            },
            () => setErrorMsg('位置情報の取得に失敗しました。'),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [isEnabled, permission]);


    const requestLocation = () => {
        navigator.geolocation.getCurrentPosition(
            () => {
                setPermission('granted');
            },
            (err) => {
                // 取得失敗時（ユーザーが拒否した場合など）
                if (err.code === err.PERMISSION_DENIED) {
                    setPermission('denied');
                }else {
                    console.error(err);
                }
            }
        );
    };
    
    return { currentPos, permission, errorMsg, requestLocation };
}