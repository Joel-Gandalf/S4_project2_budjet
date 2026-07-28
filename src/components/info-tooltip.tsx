import { useState } from "react";

interface InfoTooltipProps {
    title: string;
    description: string;
    id: string;
}

export const InfoTooltip = ({ title, description, id }: InfoTooltipProps) => {

    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <div>
            <button
                type="button"
                className="h-6 w-6 flex items-center "
                aria-expanded={isActive}
                aria-controls={id}
                onClick={
                    () => setIsActive(true)
                }
                onFocus={
                    () => setIsActive(true)
                }
                onKeyDown={(event) => {
                    if (event.key === "Escape") setIsActive(false);
                }}
            >
                <img src="/src/assets/icons/icons8-info-speech-bubble-100.png" alt="Fes click per més informació" />
            </button>
            {isActive &&
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    onClick={() => setIsActive(false)}
                >
                    <div 
                        id={id}
                        role="dialog"
                        aria-modal="true"
                        className="relative flex items-center justify-center p-12 bg-amber-50/30 border border-stone-300 rounded-lg shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            aria-label="Tanca la informació"
                            onClick={() => setIsActive(false)}
                            className="absolute -top-3.5 flex items-center justify-center h-7 w-7 border border-stone-700/50 rounded-full font-bold text-base text-stone-900 bg-stone-400/90 hover:bg-stone-400 hover:cursor-pointer"
                            >X
                        </button>
                        <div className="flex flex-col justify-center items-center gap-5 text-center">
                            <h2 className="font-bold text-base text-stone-700 leading-tight">{title}</h2>
                            <p className="font-semibold text-base text-stone-700 leading-tight">{description}</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}