
export interface StepperProps {
    currentValue: number;
    onIncrease: () => void;
    onDecrease: () => void;
    ariaDescription: string;
    minimumNumber?: number;
}

export const Stepper = ({currentValue, onIncrease, onDecrease, ariaDescription, minimumNumber = 1}: StepperProps ) => {
    return(
        <div>
            <button onClick={onDecrease} aria-label={`Resta un${ariaDescription}`} disabled={currentValue <= minimumNumber}>-</button>
            <div aria-live="polite">{currentValue}</div>
            <button onClick={onIncrease} aria-label={`Afegeix un${ariaDescription}`}>+</button>
        </div>
    );
}

{/* <button onClick={onDecrease} ...>

en vez de:

<button onClick={() => onDecrease()} ...>

Ambas funcionan igual en la práctica, pero la primera es más limpia — no crea una función anónima innecesaria en cada render. La regla general es: 
Envuelve en una función flecha solo cuando necesitas pasar argumentos concretos o ejecutar lógica extra antes de llamar a la función; si la vas a llamar tal cual, sin nada más, pásala directamente. */}