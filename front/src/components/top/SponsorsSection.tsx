
import Image from 'next/image';

const sponsors = [
  { id: '01', name: '株式会社前川製作所 様', image: '/companies/01.webp' },
  { id: '02', name: '株式会社ウェーブロック・アドバンスト・テクノロジー 様', image: '/companies/02.webp' },
  { id: '03', name: '株式会社ツガワ 様', image: '/companies/03.webp' },
  { id: '04', name: 'NTT東日本株式会社 様', image: '/companies/04.webp' },
  { id: '05', name: '株式会社バッファロー 様', image: '/companies/05.webp' },
];

export const SponsorsSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12">協賛</h2>
      <p className="font-bold text-center mb-12 text-sm">ダイヤモンドグレード以上相当の協賛企業を掲載しております.</p>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
        {sponsors.map(sponsor => (
          <div key={sponsor.id} className="flex flex-col items-center justify-center gap-4 w-full md:w-[45%] bg-white/10 rounded-lg pb-4">
            <div className="relative w-full h-fit ">
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg p-4 pb-0 relative!"
              />
            </div>
            <p className="text-center font-semibold text-lg">{sponsor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
