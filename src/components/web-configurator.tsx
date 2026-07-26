import { Stepper } from "./stepper";
import { calculatePriceWeb } from "../logic/calculate-price-web";
import type { UseWebConfigReturn } from "../hooks/use-web-config";
import services from "../data/services.json";
import webConfigDefaults from "../data/web-config-defaults.json";

interface WebConfiguratorProps {
    numberPages: UseWebConfigReturn["numberPages"];
    numberLanguages: UseWebConfigReturn["numberLanguages"];
    incrementOrDecrement: UseWebConfigReturn["incrementOrDecrement"];
}

export const WebConfigurator = ({numberPages, numberLanguages, incrementOrDecrement}: WebConfiguratorProps) => {

    const webService = services.find(service => service.id === "web");
    if (!webService) {
        throw new Error("Web service not found in services.json");
    }
    const basePrice = webService.price;

    const pricePerAdditionalUnit = webConfigDefaults.pricePerAdditionalUnit;
    
    return (
        <div>
            <div>
                <p>Nombre de pàgines</p>
                <Stepper 
                    currentValue={numberPages} 
                    onIncrease={() => incrementOrDecrement("pages", "increment")} 
                    onDecrease={() => incrementOrDecrement("pages", "decrement")} 
                    ariaDescription="a pàgina" 
                />
            </div>
            <div>
                <p>Nombre de llenguatges</p>
                <Stepper 
                    currentValue={numberLanguages} 
                    onIncrease={() => incrementOrDecrement("languages", "increment")} 
                    onDecrease={() => incrementOrDecrement("languages", "decrement")} 
                    ariaDescription=" llenguatge"  
                    />
            </div>
            <div role="status">
                {calculatePriceWeb({pages: numberPages, languages: numberLanguages, basePrice: basePrice, pricePerAdditionalUnit: pricePerAdditionalUnit})} €
            </div>
        </div>
    );
}


// La lógica detrás es: services.json y web-config-defaults.json no son estado — no cambian durante la ejecución de la app, no dependen de ninguna interacción del usuario. Son configuración estática, disponible globalmente para cualquier módulo que la necesite. Pasarlos por props implicaría tratarlos como si fueran datos dinámicos que "fluyen" por el árbol de componentes, cuando en realidad son más parecidos a una constante global accesible desde cualquier archivo mediante import.