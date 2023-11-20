import { screen, render } from '@testing-library/react';
import DashboardCard from '..';


describe('Dashboard Card', () => {
    it('should render title and count', () => {
        render(<DashboardCard title="PlateauMD Customers" count='100k' type='secondary' />);

        const dashboardCardTitle = screen.getByText('PlateauMD Customers');
        const dashboardCardCount = screen.getByText('100k');


        expect(dashboardCardTitle).toBeInTheDocument();
        expect(dashboardCardCount).toBeInTheDocument();
    });
})