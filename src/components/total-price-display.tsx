import { calculateTotal } from "../logic/calculate-total";
import type { Service } from "../types/service";
import services from "../data/services.json";

interface TotalPriceDisplayProps {
    selectedIds: Service["id"][];
}

export const TotalPriceDisplay = ({selectedIds}: TotalPriceDisplayProps) => {
    const selectedServices = services.filter(service => selectedIds.includes(service.id));
    const finalPrice = calculateTotal(selectedServices);
    return(
        <div className={`self-end flex items-end gap-2 mb-4 border rounded-lg p-4 shadow-xl ${finalPrice > 0 ? 'bg-amber-50 border-amber-300 shadow-amber-700/30' : 'border-stone-300'}`}>
            <p className="font-bold md:text-lg lg:text-xl">Pressupost: </p>
            <p className="text-2xl font-extrabold md:text-3xl lg:text-4xl">{finalPrice} €</p>
        </div>
    );
}