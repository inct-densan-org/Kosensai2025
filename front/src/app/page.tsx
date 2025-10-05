import Image from "next/image";

export default function Home() {

    return (
        <div className={"relative "}>
            <main
                className={"flex min-h-screen flex-col items-center justify-between p-24 bg-[hsl(202,100%,94%)] bg-no-repeat bg-(image:--mesh-gradient) "}>
                {/*className={"flex min-h-screen flex-col items-center justify-between p-24 bg-linear-to-br/hsl from-[hsl(195,90%,91%)] to-[hsl(243,81%,78%)] "}>*/}
                
                <div
                    className="h-screen w-screen ">
                    <div className="flex h-screen flex-col items-center justify-center bg-gray-800 sun">
                        <h1 className="text-6xl font-bold bg-gray-800 load-title">Kosen-sai</h1>
                    </div>
                </div>
            </main>

                
            <div className={"relative w-screen h-screen"}>
                <Image
                    src={"/top/poster/poster-full-textless.webp"}
                    alt={"ポスター"}
                    fill={true}
                    
                    className={"absolute w-full! h-full! object-cover "}
            
            
                />
                
                {/*この要素で制御*/}
                {/*<div className={"fixed top-0 left-0 w-screen h-screen bg-black  mask-radial-at-top-left mask-radial-from-0 mask-radial-to-100%"}>*/}
                {/*</div>*/}
            </div>
            
            
        </div>
    );
}
