
import Image from 'next/image';

const sponsors = [
  { id: '01', name: '株式会社前川製作所', image: '/companies/01.webp' },
  { id: '02', name: '株式会社ウェーブロック・アドバンスト・テクノロジー', image: '/companies/02.webp' },
  { id: '03', name: '株式会社ツガワ', image: '/companies/03.webp' },
  { id: '04', name: 'NTT 東日本株式会社\n', image: '/companies/04.webp' },
  { id: '05', name: '株式会社バッファロー', image: '/companies/05.webp' },
];

export const SponsorsSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12">協賛</h2>
      <p className="text-4xl font-bold text-center mb-12 text-sm">ダイヤモンドグレード以上相当の協賛企業を掲載しております.</p>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
        {sponsors.map(sponsor => (
          <div key={sponsor.id} className="flex flex-col items-center justify-center gap-4 w-full md:w-[45%]">
            <div className="relative w-full aspect-square bg-white/10 rounded-lg">
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg p-4"
              />
            </div>
            <p className="text-center font-semibold text-lg">{sponsor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
