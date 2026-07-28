import type { WebConfig } from "../types/web-config";

interface CalculatePriceWebParams {
    pages: WebConfig["pages"];
    languages: WebConfig["languages"];
    pricePerAdditionalUnit: number;
}

export const calculatePriceWeb = ({pages, languages, pricePerAdditionalUnit}: CalculatePriceWebParams): number => {
    const minimumIncluded = 1;
    return ((pages - minimumIncluded) + (languages - minimumIncluded))*pricePerAdditionalUnit;
}