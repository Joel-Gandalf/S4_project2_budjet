import { calculateTotal } from "../logic/calculate-total";
import type { Service } from "../types/service";
import services from "../data/services.json";
import type { UseWebConfigReturn } from "../hooks/use-web-config";
import { calculatePriceWeb } from "../logic/calculate-price-web"; 
import webConfigDefaults from "../data/web-config-defaults.json";

interface TotalPriceDisplayProps {
    selectedIds: Service["id"][];
    numberPages: UseWebConfigReturn["numberPages"];
    numberLanguages: UseWebConfigReturn["numberLanguages"];
}

export const TotalPriceDisplay = ({ selectedIds, numberPages, numberLanguages }: TotalPriceDisplayProps) => {
    const selectedServices = services.filter(service => selectedIds.includes(service.id));

    const webServiceIsSelected = selectedIds.includes("web");

    const pricePerAdditionalUnit = webConfigDefaults.pricePerAdditionalUnit;

    const finalPrice = 
        calculateTotal(selectedServices) + 
        (webServiceIsSelected ? calculatePriceWeb({pages: numberPages, languages: numberLanguages, pricePerAdditionalUnit: pricePerAdditionalUnit}) : 0);
    
    return (
        <div 
            role="status"
            className={`self-end flex items-end gap-2 mb-4 border rounded-lg p-4 shadow-xl ${finalPrice > 0 ? 'bg-amber-50 border-amber-300 shadow-amber-700/30' : 'border-stone-300'}`}>

            <p className="font-bold md:text-lg lg:text-xl">Pressupost: </p>
            <p className="text-2xl font-extrabold md:text-3xl lg:text-4xl">{finalPrice} €</p>
        </div>
    );
}