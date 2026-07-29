import type { Service } from "../types/service";

export const calculateTotal = (services: Service[]): number => {

    const totalPrice = services
        .map(service => service.price)
        .reduce((total, currentValue) => {
            return total + currentValue;
        }, 0);

    return totalPrice;
}
