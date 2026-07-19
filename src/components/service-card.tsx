import type { Service } from "../types/service";

export interface ServiceCardProps {
    service: Service;
    isSelected: boolean;
    onToggle: (id: Service["id"]) => void;
}

export const ServiceCard = ({ service: { id, name, description, price }, isSelected, onToggle }: ServiceCardProps) => {

    return (
        <article>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{price} €</p>
            <label><input 
                type="checkbox" 
                name="inputCheckedService"
                onChange={() => {
                    onToggle(id);
                }}
                id={id}
                checked={isSelected}
                aria-label={`Afegir servei ${name}`}
            />Afegir</label>
        </article>
    )
}



// NECESIDAD DE checked:
// "Controlling an input with a state variable" en la documentación de react.dev — tiene un ejemplo casi calcado a este

// diferencia entre un input controlado y uno no controlado.
// Qué hace onChange exactamente, y qué NO hace
// onChange es un detector de evento — te avisa de "el usuario ha interactuado con este checkbox y su estado interno ha cambiado", y te da la oportunidad de reaccionar (en tu caso, llamando a onToggle(id)). Pero fíjate: onChange no controla si el checkbox se ve marcado o no en pantalla — eso lo decide el navegador por su cuenta, de forma completamente independiente a React, a menos que tú se lo impidas explícitamente.
// El problema concreto que tienes ahora mismo
// Con tu código actual, cuando el usuario hace click:

// El navegador marca visualmente el checkbox por su cuenta (esto ya pasa solo, es el comportamiento nativo del HTML).
// onChange se dispara, tú llamas a onToggle(id), que actualiza el estado en tu hook (selectedIds).
// React vuelve a renderizar el componente con las nuevas props... pero como tu <input> no tiene ningún atributo checked, React no toca el estado visual del checkbox — el navegador sigue mostrando lo que él decidió en el paso 1, sin que React haya intervenido nunca.

// Esto puede parecer que "funciona" a simple vista al principio (el checkbox se ve marcado porque el navegador lo marcó solo), pero es una coincidencia peligrosa, no un control real. El problema aparece en cuanto la fuente de la verdad y lo que ves en pantalla puedan divergir — por ejemplo, si en el futuro quieres "desmarcar todos los servicios" con un botón externo, o si hay algún error y el estado no se actualiza como esperabas: el checkbox seguiría mostrando lo que el navegador decidió por su cuenta, no lo que dice tu estado real. A esto se le llama input no controlado — el navegador es dueño del valor visual, React no tiene autoridad sobre él.