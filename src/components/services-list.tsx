import services from '../data/services.json';
import { ServiceCard } from './service-card';
import type { Service } from '../types/service';
import type { UseWebConfigReturn } from '../hooks/use-web-config';
import { WebConfigurator } from './web-configurator';

// import { useSelectedServices } from '../hooks/use-selected-services';

interface ServicesListProps {
    selectedIds: Service["id"][];
    toggleService: (id: Service["id"]) => void;
    numberPages: UseWebConfigReturn["numberPages"];
    numberLanguages: UseWebConfigReturn["numberLanguages"];
    incrementOrDecrement: UseWebConfigReturn["incrementOrDecrement"];
}

export const ServicesList = ({ selectedIds, toggleService, numberPages, numberLanguages, incrementOrDecrement }: ServicesListProps) => {

    // const selectedServices = useSelectedServices();    
    // const selectedIds = selectedServices[0];
    // const toggleService = selectedServices[1];
    // const [selectedIds, toggleService] = useSelectedServices();

    return (
        <fieldset className='flex flex-col gap-5'>
            <legend className='sr-only'>Selecciona els serveis que t'interessin</legend>
            {services.map(service => (
                <article key={service.id}>
                    <ServiceCard service={service} isSelected={selectedIds.includes(service.id)} onToggle={toggleService} />
                    {(service.id === "web" && selectedIds.includes("web")) && <WebConfigurator numberPages={numberPages} numberLanguages={numberLanguages} incrementOrDecrement={incrementOrDecrement} />}
                </article>
            ))}
        </fieldset>
    )
}