import services from '../data/services.json';
import { ServiceCard } from './service-card';
import type { Service } from '../types/service';

// import { useSelectedServices } from '../hooks/useSelectedServices';

interface ServicesListProps {
    selectedIds: Service["id"][]; 
    toggleService: (id: Service["id"]) => void;
}

export const ServicesList = ({selectedIds, toggleService}: ServicesListProps) => {

// const selectedServices = useSelectedServices();    
// const selectedIds = selectedServices[0];
// const toggleService = selectedServices[1];
// const [selectedIds, toggleService] = useSelectedServices();

    return (
        <fieldset>
            <legend className='sr-only'>Selecciona els serveis que t'interessin</legend>
            {services.map(service => (
                <ServiceCard service={service} isSelected={selectedIds.includes(service.id)} onToggle={toggleService} key={service.id} />
            ) )}
        </fieldset>
    )
}