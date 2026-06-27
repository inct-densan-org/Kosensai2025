

import Modal from './Modal';
import Image from 'next/image';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    locationId: number;
    locationName: string;
    locationLabel: string;
    locationOwner?: string;
    locationDesc?: string;
    photos?: string[];
    photoDescriptions?: string[];
};

export const PlaceImageModal = ({ isOpen, onClose, locationName, locationId, locationLabel, locationOwner, locationDesc, photos, photoDescriptions }: Props) => {
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`${locationName}　（ ${locationLabel}` + (locationOwner ? `  ${locationOwner}` : '') + " ）" }>
            {locationDesc&& <p className={"ml-2 mb-4"}>{locationDesc}</p>}
            {/*    ここに指定されたIDの画像を表示する処理*/}
            {photos && photos.length > 0 ? photos.map((photoName, i) => {
                let photoDescription: string|null = null
                if (photoDescriptions && photoDescriptions[i]) {
                    photoDescription = photoDescriptions[i]
                }
                return (
                    <div className={"relative w-full h-auto aspect-video px-8 py-4"} key={photoName}>
                        {i == 1 && <div className={" border-dashed h-[1px] w-[104%] ml-[-2%] border-t-4  -mt-4 mb-5"}></div>}
                    <Image
                    alt={locationName+"の写真"}
                    src={`/img/ccd/${photoName}`}
                    fill
                    className={"!relative !h-full "}
                    />
                    {photoDescription && (
                        <p className="text-sm text-gray-500">
                            {photoDescription}
                        </p>
                    )}
                </div>
                )
                }
            ) : 
                <div className={"w-full h-auto aspect-video text-white bg-gray-500 text-center "}>
                    No Image
                </div>
            }
        </Modal>
    );
};
