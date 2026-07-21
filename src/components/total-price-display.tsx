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
        <p>{finalPrice}€</p>
    );
}