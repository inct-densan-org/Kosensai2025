import {MotionDivInClient} from "@/components/MotionDivInClient";
import Image from "next/image";
import {dotGothic16Font} from "@/app/layout";
export function Hero() {
    return (
        <>
            <Image
                src={"/top/poster/poster-background-line.webp"}
                alt={"ポスター"}
                fill={true}
                className={"absolute w-screen! h-full! object-cover md:object-fill after:pointer-events-none drag-none select-none pointer-events-none "}
            />
            <Parts />
            <Title />
        </>
    )
}


const LOADTIME = 1.75 // 秒
function Parts() {
    
    return (
        <>
            
            <MotionDivInClient isImg={true} initial={{translateY: -600, opacity: 0}} animate={{translateY: 0, opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-part-ribbon.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-fill after:pointer-events-none drag-none select-none pointer-events-none "}
                />
            </MotionDivInClient>
            <MotionDivInClient isImg={true} initial={{y: -200, opacity: 0}} animate={{y: 0, opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-part-stars-top.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-fill after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>

            <MotionDivInClient isImg={true} initial={{y: -200, opacity: 0}} animate={{y: 0, opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-parts-taiyaki-set.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-contain after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>
            
            <MotionDivInClient isImg={true} initial={{y: -1200}} animate={{y: 0}}
                               transition={{type: "spring", stiffness: 220, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-part-stick-wrench.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-contain after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>
            <MotionDivInClient isImg={true} initial={{y: -1200}} animate={{y: 0}}
                               transition={{type: "spring", stiffness: 220, damping: 20, delay: LOADTIME + .50}}
            >
                <Image
                    src={"/top/poster/poster-part-stick-brush.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-contain after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>
            <MotionDivInClient isImg={true} initial={{y: -1200}} animate={{y: 0}}
                               transition={{type: "spring", stiffness: 220, damping: 20, delay: LOADTIME + .60}}
            >
                <Image
                    src={"/top/poster/poster-part-stick-mic.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-contain after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>

            <MotionDivInClient isImg={true} initial={{y: -200, opacity: 0}} animate={{y: 0, opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-part-DNA.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-fill after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>
            <MotionDivInClient isImg={true} initial={{y: -200, opacity: 0}} animate={{y: 0, opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-part-earth.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-contain after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>
            <MotionDivInClient isImg={true} initial={{y: -200, opacity: 0}} animate={{y: 0, opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-part-frasco.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-contain after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>
            <MotionDivInClient isImg={true} initial={{y: -200, opacity: 0}} animate={{y: 0, opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-part-ink.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-contain after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>
            <MotionDivInClient isImg={true} initial={{y: -600, opacity: 0}} animate={{y: 0, opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .30}}
            >
                <Image
                    src={"/top/poster/poster-part-newton.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-contain after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>

            <MotionDivInClient isImg={true} initial={{translateY: 600, opacity: 0}} animate={{translateY: 0, opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-part-solar-system.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-contain after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>
            <MotionDivInClient isImg={true} initial={{opacity: 0}} animate={{opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-part-stars-bottom.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-fill after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>

            <MotionDivInClient isImg={true} initial={{scaleX: 0, translateX: 1200 }} animate={{scaleX: 1, translateX: 0}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-part-waves.webp"}
                    alt={"ポスター"}
                    fill={true}
                    sizes={"100vw"}
                    className={"absolute w-screen! h-full! object-cover md:object-fill after:pointer-events-none drag-none select-none pointer-events-none"}
                />
            </MotionDivInClient>

            <MotionDivInClient isImg={true} initial={{y: -200, opacity: 0}} animate={{y: 0, opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .40}}
            >
                <Image
                    src={"/top/poster/poster-part-window.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-contain after:pointer-events-none drag-none select-none pointer-events-none  "}
                />
            </MotionDivInClient>
            <MotionDivInClient isImg={true} initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}}
                               transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .25}}
            >
                <Image
                    src={"/top/poster/poster-part-stage.webp"}
                    alt={"ポスター"}
                    fill={true}
                    className={"absolute w-screen! h-full! object-cover md:object-contain after:pointer-events-none drag-none select-none pointer-events-none "}
                />
            </MotionDivInClient>

        </>
    )
}
function Title() {
    return (
        <>
            {/*タイトル*/}
            <div className={"relative left-0 top-5 h-fit w-full text-center flex flex-col"}>
                
                <div className={"block w-full h-fit"}>
                    <MotionDivInClient isImg={false} initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}}
                                       transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .25}}
                    >
                        <h1 className={dotGothic16Font.className + " drop-shadow-2xl/100 w-full text-center text-[min(20vw,20vh)] text-[#f5ff71] tracking-widest font-light"}>高専祭</h1>
                    </MotionDivInClient>
                </div>
                <div className={"block w-full h-fit"}>
                    <MotionDivInClient isImg={false}
                        initial={{y: -100, opacity: 0}}
                        animate={{y: 0, opacity: 1}}

                        transition={{type: "spring", stiffness: 120, damping: 20, delay: LOADTIME + .25}}
                    >
                        <p className={dotGothic16Font.className + " drop-shadow-2xl/60 w-full text-center  text-[min(6vw,6vh)] text-white tracking-widest font-light"}>一関工業高等専門学校</p>
                    </MotionDivInClient>
                </div>
            </div>
        </>
    )
}