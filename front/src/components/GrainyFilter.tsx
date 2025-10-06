const GrainyFilter = () => {
    return (
        <svg className="pointer-events-none absolute -z-10 h-0 w-0">
            <filter id="grainy-filter">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65" // ノイズの粗さ
                    numOctaves="1"
                    stitchTiles="stitch"
                />
                {/* ノイズを単色にする（オプション） */}
                <feColorMatrix type="saturate" values="0"/>
            </filter>
        </svg>
    );
};

export default GrainyFilter;