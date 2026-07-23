import { useState } from "react";
import type { Service } from "../types/service";


//  indexed access type, sirve para : extraer el tipo de una propiedad concreta de una interfaz ya existente Service["id"].

export const useSelectedServices = (): [Service["id"][], (id: Service["id"]) => void] => {
    const initialSelectedIds: Service["id"][] = []; 
    const [selectedIds, setSelectedIds] = useState(initialSelectedIds);

    const toggleService = (id: Service["id"]) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
            return;
        }
        // setIdSelected(selectedIds.filter(selectedId => selectedId === id));
        // Esto no añade nada pq filter no puede añadir un elemento que no existe.
        // el spread operator 1ero desgrana el array como esta dentro de [] lo hace dentro de un array y al añadir  , id  añade un último elemento 
        setSelectedIds([...selectedIds, id]);
    }

    return [selectedIds, toggleService];
}

// ():[Service["id"][], void] => {

// El problema está en la segunda posición de la tupla: has puesto void, pero void describe lo que devuelve una función al ejecutarla (nada, en este caso), no el tipo de la función en sí misma como valor. Tú no estás devolviendo "el resultado de ejecutar toggleService" — estás devolviendo la función toggleService en sí, para que quien use el hook pueda llamarla más tarde, cuando quiera.
// Para tipar "esto es una función que recibe tal parámetro y no devuelve nada", la sintaxis en TypeScript es distinta — necesitas describir la firma completa de la función: qué parámetros acepta y qué devuelve, usando la notación de función con flecha en el tipo:

// (id: Service["id"]) => void