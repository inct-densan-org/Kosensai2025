import React from "react";

const Loading = () => {
    return (
        <div className="w-vw h-lvh flex justify-center items-center relative">
            <div className={"absolute mt-auto flex flex-row justify-center items-center gap-5"}>
                <div className={"animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent m-auto"}></div>
                <p className={""}>Now Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
