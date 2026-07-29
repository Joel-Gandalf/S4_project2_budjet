import { ServicesList } from "./components/services-list";
import { useSelectedServices } from './hooks/use-selected-services';
import { TotalPriceDisplay } from "./components/total-price-display";
import { useWebConfig } from "./hooks/use-web-config";

export const App = () => {

  const { selectedIds, toggleService } = useSelectedServices();
  const { numberPages, numberLanguages, incrementOrDecrement } = useWebConfig();

  return (
    <>
      <header className="flex flex-col px-8 md:px-20 lg:px-30">
        <h1 className="flex items-center justify-center text-2xl font-bold py-5 px-3 my-10 bg-amber-50/30 border border-stone-400 rounded-lg shadow-xl md:text-3xl lg:text-4xl">Aconsegueix la millor qualitat</h1>
      </header>
      <section className="flex flex-col gap-8 px-8 md:px-20 lg:px-30">
        <ServicesList 
            selectedIds={selectedIds} 
            toggleService={toggleService} 
            numberPages={numberPages} 
            numberLanguages={numberLanguages} 
            incrementOrDecrement={incrementOrDecrement}
        />
        <TotalPriceDisplay 
            selectedIds={selectedIds}
            numberPages={numberPages} 
            numberLanguages={numberLanguages}
        />
      </section>
    </>
  );
}


