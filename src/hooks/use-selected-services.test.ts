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
        // result.current[0] = selectedIds
        // expect(selectedIds).toEqual([]);

        expect(result.current.selectedIds).toEqual([]);
        // expect(result.current[0].length).toBe(0);

        act(() => result.current.toggleService(services[0].id));

        expect(result.current.selectedIds).toEqual(['seo']);
        // expect(service.price).toBe(300);
    });

    // Escenario: Desmarcar un servicio resta su precio del total
    //   Dado que el servicio "SEO" está marcado y el total es 300€
    //   Cuando desmarco el checkbox del servicio "SEO"
    //   Entonces el precio total mostrado debe ser 0€
    it('toggling a selected service again removes it from the selection.', () => {
        const { result } = renderHook(() => useSelectedServices());

        act(() => result.current.toggleService(services[0].id));
        expect(result.current.selectedIds).toEqual(['seo']);

        act(() => result.current.toggleService(services[0].id));
        expect(result.current.selectedIds).toEqual([]);
    });


    // Escenario: Marcar varios servicios simultáneamente
    //   Dado que el precio total mostrado es 0€
    //   Cuando marco los servicios "SEO" y "Ads"
    //   Entonces el precio total mostrado debe ser 700€

    it('select multiple services simultaneously.', () => {
        const { result } = renderHook(() => useSelectedServices());

        expect(result.current.selectedIds).toEqual([]);

        act(() => result.current.toggleService(services[0].id));
        expect(result.current.selectedIds).toEqual(['seo']);
        
        act(() => result.current.toggleService(services[1].id));
        expect(result.current.selectedIds).toEqual(['seo', 'ads']);

    });
});

// quiero hacer un refactor. mi profesora me ha dicho que es mejor pasar un objeto en el return que un array para después al hacer la llamada a la función poder ser más explicativo en la desestructuración, sobre todo en los test y no tener que añadir código: en vez de esto:   

//         const { result } = renderHook(() => useSelectedServices());
//         result.current[0] = selectedIds
//         expect(selectedIds).toEqual([]);


// esto:  

// expect(result.current.selectedIds)

// además si por lo que sea el array cambiase y con ello sus indices podría haber errores futuros con un objeto en cambio siempre se llama al mismo atributo tenga el orden que tenga

