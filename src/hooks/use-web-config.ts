import { useState } from "react";
import type { WebConfig } from "../types/web-config";
import webConfigDefaults from "../data/web-config-defaults.json";

type WebConfigKey = keyof WebConfig;

export const useWebConfig = (): {
    numberPages: number, 
    numberLanguages: number, 
    incrementOrDecrement: (key: WebConfigKey, direction: "increment" | "decrement")=> void
} => {
    
    const defaultValue: number = webConfigDefaults.defaultValue;
    const [ numberPages, setNumberPages ] = useState(defaultValue);
    const [ numberLanguages, setNumberLanguages ] = useState(defaultValue);

    const incrementOrDecrement = (key: WebConfigKey, direction: "increment" | "decrement") => {

        if (direction === "increment") {
            if (key === "pages") {
                setNumberPages(numberPagesPrev => numberPagesPrev + 1 );
                return;
            }
            setNumberLanguages(numberLanguagesPrev => numberLanguagesPrev + 1 );
            return;
        }
        if (key === "pages") {
            setNumberPages(numberPagesPrev => numberPagesPrev > 1 ? numberPagesPrev -1 : numberPagesPrev);
            return;
        }
        setNumberLanguages(numberLanguagesPrev => numberLanguagesPrev > 1 ? numberLanguagesPrev -1 : numberLanguagesPrev);
        return;
    }

    return { numberPages, numberLanguages, incrementOrDecrement }
}
// Si escribes keyof WebConfig, TypeScript lo interpreta como si hubieras escrito literalmente "pages" | "languages" (una unión de dos string literals). No tienes que escribir esos strings a mano — TypeScript los deriva automáticamente de las claves reales de WebConfig.
// keyof WebConfig pregunta "¿qué propiedades tiene este tipo?" (respuesta: "pages" | "languages").


// Pq usar -1 en vez de --
// setNumberLanguages(numberLanguages => numberLanguages > 1 ? --numberLanguages : numberLanguages);
// setNumberLanguages(numberLanguages => numberLanguages > 1 ? numberLanguages -1 : numberLanguages);

// Pero aquí hay un problema distinto, de estilo/buenas prácticas, no de resultado numérico: ++numberPages está mutando el parámetro de la función (reasignando su valor), en vez de limitarte a calcular y devolver un nuevo valor sin tocar nada. Las funciones que le pasas a un setState deberían ser puras — reciben un valor, devuelven un valor nuevo, sin efectos secundarios ni reasignaciones. Es habitual que los linters (Oxlint incluido, con reglas equivalentes a no-param-reassign de ESLint) marquen esto como mala práctica, aunque aquí no rompa nada porque es un número primitivo. Te recomendaría escribir la expresión sin mutar: pensar "el valor siguiente es el actual más uno", como una expresión que no reasigna nada.


// Pq usar la  FORMA FUNCIONAL  ?????

// setNumberPages(numberPages > 1 ? numberPages - 1 : numberPages) (forma directa) funciona usando la variable numberPages tal como la tienes disponible en el momento en que se define esa función — es un valor "capturado" del render actual (esto se llama closure, cierre). Normalmente funciona bien.

// setNumberPages(prev => prev > 1 ? prev - 1 : prev) (forma funcional) le dice a React: "cuando vayas a aplicar este cambio, dame tú el valor más actualizado que tengas en ese momento, y yo calculo el siguiente a partir de él". La diferencia importa sobre todo cuando podrían encolarse varias actualizaciones seguidas antes de que React vuelva a renderizar — con la forma directa, cada actualización usaría el mismo valor "viejo" capturado, mientras que con la funcional cada una encadena correctamente sobre la anterior.

// La única diferencia sintáctica entre ambas líneas es esos dos caracteres: numberPages =>. Sin ellos, es un valor calculado ya mismo. Con ellos, es una función que React ejecutará él mismo cuando le convenga, garantizándote que el parámetro que recibe (lo llames numberPages, prev, o x) es el valor de estado más actualizado posible en ese momento.


