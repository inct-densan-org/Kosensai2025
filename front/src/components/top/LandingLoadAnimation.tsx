import './LandingLoadAnimation.sass';

export function LandingLoadAnimation() {
    return (
        <div className="fixed inset-0 h-screen w-screen overflow-hidden hidden-scrollbar z-[999] ">
            <div className="flex h-screen flex-col items-center justify-center bg-dark-background sun after:animate-caret-blink">
                <h1 className="text-6xl font-bold bg-dark-background load-title">Kosen-sai</h1>
            </div>
        </div>
    )
}