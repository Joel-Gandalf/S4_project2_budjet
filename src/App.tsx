import { ServicesList } from "./components/services-list";
import { useSelectedServices } from './hooks/useSelectedServices';

export const App = () => {

  const [selectedIds, toggleService] = useSelectedServices();

  return (
    <>
      <ServicesList selectedIds={selectedIds} toggleService={toggleService} />
    </>
  )
}


