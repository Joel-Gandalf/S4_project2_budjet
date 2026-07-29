import { Stepper } from "./stepper";
import { calculatePriceWeb } from "../logic/calculate-price-web";
import type { UseWebConfigReturn } from "../hooks/use-web-config";
import webConfigDefaults from "../data/web-config-defaults.json";
import { InfoTooltip } from "./info-tooltip";
import  infoTooltipData  from "../data/info-tooltip.json";

interface WebConfiguratorProps {
    numberPages: UseWebConfigReturn["numberPages"];
    numberLanguages: UseWebConfigReturn["numberLanguages"];
    incrementOrDecrement: UseWebConfigReturn["incrementOrDecrement"];
}

export const WebConfigurator = ({numberPages, numberLanguages, incrementOrDecrement}: WebConfiguratorProps) => {

    const pricePerAdditionalUnit = webConfigDefaults.pricePerAdditionalUnit;
    
    return (
        <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
                <p className="text-sm text-stone-700 lg:text-base">Nombre de pàgines</p>
                <InfoTooltip 
                    title={infoTooltipData.pages.title} 
                    description={infoTooltipData.pages.description} 
                    id={infoTooltipData.pages.id}/>
                <Stepper 
                    currentValue={numberPages} 
                    onIncrease={() => incrementOrDecrement("pages", "increment")} 
                    onDecrease={() => incrementOrDecrement("pages", "decrement")} 
                    ariaDescription="a pàgina" 
                />
            </div>
            <div className="flex items-center gap-1">
                <p className="text-sm text-stone-700 lg:text-base">Nombre de llenguatges</p>
                <InfoTooltip 
                    title={infoTooltipData.languages.title} 
                    description={infoTooltipData.languages.description} 
                    id={infoTooltipData.languages.id} />
                <Stepper 
                    currentValue={numberLanguages} 
                    onIncrease={() => incrementOrDecrement("languages", "increment")} 
                    onDecrease={() => incrementOrDecrement("languages", "decrement")} 
                    ariaDescription=" llenguatge"  
                    />
            </div>
            <div role="status" className="font-semibold mt-1.5">
                Extra {calculatePriceWeb({pages: numberPages, languages: numberLanguages, pricePerAdditionalUnit: pricePerAdditionalUnit})} €
            </div>
        </div>
    );
}


// La lógica detrás es: services.json y web-config-defaults.json no son estado — no cambian durante la ejecución de la app, no dependen de ninguna interacción del usuario. Son configuración estática, disponible globalmente para cualquier módulo que la necesite. Pasarlos por props implicaría tratarlos como si fueran datos dinámicos que "fluyen" por el árbol de componentes, cuando en realidad son más parecidos a una constante global accesible desde cualquier archivo mediante import.