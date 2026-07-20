import services from '../data/services.json';
import { ServiceCard } from './service-card';
import { useSelectedServices } from '../hooks/useSelectedServices';

export const ServicesList = () => {

// const selectedServices = useSelectedServices();    
// const selectedIds = selectedServices[0];
// const toggleService = selectedServices[1];
const [selectedIds, toggleService] = useSelectedServices();

    return (
        <fieldset>
            <legend className='sr-only'>Selecciona els serveis que t'interessin</legend>
            {services.map(service => (
                <ServiceCard service={service} isSelected={selectedIds.includes(service.id)} onToggle={toggleService} key={service.id}></ServiceCard>
            ) )}
        </fieldset>
        
    )
}