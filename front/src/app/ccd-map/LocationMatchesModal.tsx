

import Modal from './Modal';
import Image from 'next/image';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    locationId: number;
    locationName: string;
};

export const PlaceImageModal = ({ isOpen, onClose, locationName, locationId }: Props) => {
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`${locationName}`}>
            
            {/*    ここに指定されたIDの画像を表示する処理*/}
            {locationId ? (
                <div className={"w-full h-auto aspect-video "}>
                    <Image
                    alt={locationName+"の写真"}
                    src={`/img/ccd/${locationId}`}
                    />
                </div>
            ) : (
                <div className={"w-full h-auto aspect-video text-white bg-gray-500 text-center "}>
                    No Image
                </div>
            )}
        </Modal>
    );
};
