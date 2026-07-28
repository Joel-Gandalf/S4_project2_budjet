
export interface StepperProps {
    currentValue: number;
    onIncrease: () => void;
    onDecrease: () => void;
    ariaDescription: string;
    minimumNumber?: number;
}

export const Stepper = ({currentValue, onIncrease, onDecrease, ariaDescription, minimumNumber = 1}: StepperProps ) => {
    return(
        <div className="flex items-center gap-3">
            <button onClick={onDecrease} aria-label={`Resta un${ariaDescription}`} disabled={currentValue <= minimumNumber} className="flex items-center justify-center h-5 w-5 pb-1 border border-amber-300 rounded-full font-bold leading-none">-</button>
            <div aria-live="polite" className="flex items-center justify-center h-8 w-12 border border-amber-300 rounded-lg font-semibold">{currentValue}</div>
            <button onClick={onIncrease} aria-label={`Afegeix un${ariaDescription}`} className="flex items-center justify-center h-5 w-5 pb-1 border border-amber-300 rounded-full font-bold leading-none">+</button>
        </div>
    );
}

{/* <button onClick={onDecrease} ...>

en vez de:

<button onClick={() => onDecrease()} ...>

Ambas funcionan igual en la práctica, pero la primera es más limpia — no crea una función anónima innecesaria en cada render. La regla general es: 
Envuelve en una función flecha solo cuando necesitas pasar argumentos concretos o ejecutar lógica extra antes de llamar a la función; si la vas a llamar tal cual, sin nada más, pásala directamente. */}