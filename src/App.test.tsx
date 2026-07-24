import { App } from "./App";
import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event"

describe('App component', () => {
    // Escenario: Marcar un servicio suma su precio al total
    //   Dado que el precio total mostrado es 0€
    //   Cuando marco el checkbox del servicio "SEO"
    //   Entonces el precio total mostrado debe ser 300€
    it('should display the correct total after selecting a service', async () => {
        render(<App/>);
        const initialBudget = screen.getByRole('status');
        expect(within(initialBudget).getByText('0 €')).toBeInTheDocument();

        const checkboxSeo = screen.getByRole('checkbox', {name: /SEO/i});
        // const user = userEvent.setup();
        // await user.click(checkboxSeo);
        await userEvent.click(checkboxSeo);

        const finalBudget = screen.getByRole('status');
        expect(within(finalBudget).getByText('300 €')).toBeInTheDocument();
    });

    // Escenario: Desmarcar un servicio resta su precio del total
    //   Dado que el servicio "SEO" está marcado y el total es 300€
    //   Cuando desmarco el checkbox del servicio "SEO"
    //   Entonces el precio total mostrado debe ser 0€
    it('should subtract the service price from the total when deselected', async () => {
        render(<App/>);
        const checkboxSeo = screen.getByRole('checkbox', {name: /SEO/i});
        await userEvent.click(checkboxSeo);
        const initialBudget = screen.getByRole('status');
        expect(within(initialBudget).getByText('300 €')).toBeInTheDocument();

        await userEvent.click(checkboxSeo);

        const finalBudget = screen.getByRole('status');
        expect(within(finalBudget).getByText('0 €')).toBeInTheDocument();
    });

    // Escenario: Marcar varios servicios simultáneamente
    //   Dado que el precio total mostrado es 0€
    //   Cuando marco los servicios "SEO" y "Ads"
    //   Entonces el precio total mostrado debe ser 700€
    it('should display the correct total after selecting multiple services', async () => {
        render(<App/>);
        const initialBudget = screen.getByRole('status');
        expect(within(initialBudget).getByText('0 €')).toBeInTheDocument();

        const checkboxSeo = screen.getByRole('checkbox', {name: /SEO/i});
        const checkboxAds = screen.getByRole('checkbox', {name: /Ads/i});
        await userEvent.click(checkboxSeo);
        await userEvent.click(checkboxAds);

        const finalBudget = screen.getByRole('status');
        expect(within(finalBudget).getByText('700 €')).toBeInTheDocument();
    });
});