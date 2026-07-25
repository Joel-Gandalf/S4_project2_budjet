import type { WebConfig } from "../types/web-config";
import type { Service } from "../types/service";

interface CalculatePriceWebParams {
    pages: WebConfig["pages"];
    languages: WebConfig["languages"];
    basePrice: Service["price"];
    pricePerAdditionalUnit: number;
}

export const calculatePriceWeb = ({pages, languages, basePrice, pricePerAdditionalUnit}: CalculatePriceWebParams): number => {
    
    return (pages + languages)*pricePerAdditionalUnit + basePrice;
}