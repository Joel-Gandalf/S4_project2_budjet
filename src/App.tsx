import { ServicesList } from "./components/services-list";
import { useSelectedServices } from './hooks/useSelectedServices';
import { TotalPriceDisplay } from "./components/total-price-display";

export const App = () => {

  const [selectedIds, toggleService] = useSelectedServices();

  return (
    <>
      <section className="px-8 md:px-20 lg:px-30">
        <ServicesList selectedIds={selectedIds} toggleService={toggleService} />
        <TotalPriceDisplay selectedIds={selectedIds}/>
      </section>
    </>
  )
}


