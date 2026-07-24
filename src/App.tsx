import { ServicesList } from "./components/services-list";
import { useSelectedServices } from './hooks/use-selected-services';
import { TotalPriceDisplay } from "./components/total-price-display";

export const App = () => {

  const {selectedIds, toggleService} = useSelectedServices();

  return (
    <>
      <section className="flex flex-col gap-8 px-8 md:px-20 lg:px-30">
        <ServicesList selectedIds={selectedIds} toggleService={toggleService} />
        <TotalPriceDisplay selectedIds={selectedIds}/>
      </section>
    </>
  )
}


