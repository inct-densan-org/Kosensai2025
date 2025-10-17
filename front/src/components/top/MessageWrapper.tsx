"use client"
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import {useIsMobile} from "@/utils/useIsMobile";
import {ReactNode} from "react";
import {FadeInWhenVisible} from "@/components/top/FadeInWhenVisible";

export function MessagesWrapper({children}: { children: ReactNode[] }) {
    const isMobile = useIsMobile();
    if (isMobile) {

        return (
            <Swiper key={`messages-wrapper-${children.length}`}
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{clickable: true}}
                    className={"max-h-1/2 md:max-h-full md:w-1/2 md:m-0"}
                    autoHeight={false}
            >
                {children.map(element => {
                    return (
                        <SwiperSlide>

                            <FadeInWhenVisible className={"overflow-y-scroll"}>
                                {element}
                            </FadeInWhenVisible>
                        </SwiperSlide>
                    )
                })}
            </Swiper>

        )
    } else {
        return (
            <div className={"flex flex-col h-full w-full"}>
                <FadeInWhenVisible>
                    {children}
                </FadeInWhenVisible>
            </div>
        )
    }
}