import { renderHook, act } from '@testing-library/react';
import { useSelectedServices } from './use-selected-services';
// import services from '../data/services.json';
import type { Service } from '../types/service';

describe('useSelectedServices', () => {

    const services: Service[] = [
        {
            id: "seo",
            name: "SEO",
            description: "Optimització per a motors de cerca per millorar la visibilitat online",
            price: 300
        },
        {
            id: "ads",
            name: "Ads",
            description: "Gestió de campanyes de publicitat en plataformes digitals i xarxes socials",
            price: 400
        }
    ]

    // Escenario: Marcar un servicio suma su precio al total
    //   Dado que el precio total mostrado es 0€
    //   Cuando marco el checkbox del servicio "SEO"
    //   Entonces el precio total mostrado debe ser 300€
    it('adds the service id to the selection', () => {
        const { result } = renderHook(() => useSelectedServices());
        expect(result.current[0]).toEqual([]);
        // expect(result.current[0].length).toBe(0);

        act(() => result.current[1](services[0].id));

        expect(result.current[0]).toEqual(['seo']);
        // expect(service.price).toBe(300);
    });

    // Escenario: Desmarcar un servicio resta su precio del total
    //   Dado que el servicio "SEO" está marcado y el total es 300€
    //   Cuando desmarco el checkbox del servicio "SEO"
    //   Entonces el precio total mostrado debe ser 0€
    it('toggling a selected service again removes it from the selection.', () => {
        const { result } = renderHook(() => useSelectedServices());

        act(() => result.current[1](services[0].id));
        expect(result.current[0]).toEqual(['seo']);

        act(() => result.current[1](services[0].id));
        expect(result.current[0]).toEqual([]);
    });


    // Escenario: Marcar varios servicios simultáneamente
    //   Dado que el precio total mostrado es 0€
    //   Cuando marco los servicios "SEO" y "Ads"
    //   Entonces el precio total mostrado debe ser 700€

    it('select multiple services simultaneously.', () => {
        const { result } = renderHook(() => useSelectedServices());

        expect(result.current[0]).toEqual([]);

        act(() => result.current[1](services[0].id));
        expect(result.current[0]).toEqual(['seo']);
        
        act(() => result.current[1](services[1].id));
        expect(result.current[0]).toEqual(['seo', 'ads']);

    });
});



// const [selectedIds, toggleService] = useSelectedServices();

