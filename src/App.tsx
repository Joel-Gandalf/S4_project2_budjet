import { ServicesList } from "./components/services-list";
import { useSelectedServices } from './hooks/useSelectedServices';
import { TotalPriceDisplay } from "./components/total-price-display";

export const App = () => {

  const [selectedIds, toggleService] = useSelectedServices();

  return (
    <>
      <section>
        <ServicesList selectedIds={selectedIds} toggleService={toggleService} />
        <TotalPriceDisplay selectedIds={selectedIds}/>
      </section>
    </>
  )
}


