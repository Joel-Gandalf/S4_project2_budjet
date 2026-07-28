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
            <div id={id}>
                <button type="button" aria-label="Tanca la informació" onClick={() => setIsActive(false)}>X</button>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>}
        </div>
    );
}