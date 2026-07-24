import type { Service } from "../types/service";
import { calculateTotal } from "./calculate-total";

describe('calculateTotal', () => {

    it('calculate the total budget with all selected services', () => {

        const services: Service[] = [
            {
                "id": "seo",
                "name": "SEO",
                "description": "Optimització per a motors de cerca per millorar la visibilitat online",
                "price": 300
            },
            {
                "id": "ads",
                "name": "Ads",
                "description": "Gestió de campanyes de publicitat en plataformes digitals i xarxes socials",
                "price": 400
            },
            {
                "id": "web",
                "name": "Web",
                "description": "Programació d'una web responsive completa",
                "price": 500
            }
        ]

        const result = calculateTotal(services);

        expect(result).toBe(1200);
    });

    it('returns 0 if no services are selected', () => {

        const services: Service[] = []

        const result = calculateTotal(services);

        expect(result).toBe(0);
    });

    it('Calculate the total budget with a selected service', () => {

        const services: Service[] = [
            {
                "id": "seo",
                "name": "SEO",
                "description": "Optimització per a motors de cerca per millorar la visibilitat online",
                "price": 300
            }
        ]

        const result = calculateTotal(services);

        expect(result).toBe(300);
    });
});