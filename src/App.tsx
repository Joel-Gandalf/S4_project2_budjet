import { ServicesList } from "./components/services-list";
import { useSelectedServices } from './hooks/use-selected-services';
import { TotalPriceDisplay } from "./components/total-price-display";
import { useWebConfig } from "./hooks/use-web-config";

export const App = () => {

  const { selectedIds, toggleService } = useSelectedServices();
  const { numberPages, numberLanguages, incrementOrDecrement } = useWebConfig();

  return (
    <>
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


