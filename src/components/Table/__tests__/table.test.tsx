import { screen, render } from '@testing-library/react';
import {within} from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import Table from '..';
import { TableHeader } from '@/models/Table';


const prevMock = jest.fn()
const nextMock = jest.fn();

const tableHdrs: TableHeader[] = [
    {
        name: "Name",
        key: 'name'
    },
    {
        name: "Date of Birth",
        key: "dob"
    }
]


const data = [
    {
        name: "Akan",
        dob: "12/10/1997"
    },
    {
        name: "Bassey",
        dob: "12/10/1997"
    }
]

describe("Table", () => {
    describe('Render', () => {
        it('should render table', () => {
            render(<Table.DataTable headers={tableHdrs} data={data} />)


            const table = screen.getAllByTestId('table')[0];
            const headers = screen.getAllByTestId('table-header');
            const rows = screen.getAllByTestId('table-row');


            expect(table).toBeInTheDocument();
            expect(headers.length).toEqual(2);
            expect(rows.length).toEqual(3);
        }),
        it('should render table footer with current and data count', () => {

            const current = 2;
            const total = 4;
            render(<Table.Footer current={current} total={total} prev={prevMock}  next={nextMock}/>)


            const footer = screen.getByTestId('table-footer');

            const pageCount = within(footer).getByText(`Page ${current} of ${total}`, { exact: false })

            expect(footer).toBeInTheDocument();
            expect(pageCount).toBeDefined();
        })
    }),
    describe('Behavior', () => {
        it('should call previous function when clicked', async () => {
            render(<Table.Footer current={1} total={5} prev={prevMock}  next={nextMock}/>);

            const previousButton = screen.getByText('Prev');
            
            await userEvent.click(previousButton);


            expect(prevMock).toHaveBeenCalled();
        }),

        it('should call next function when clicked', async () => {
            render(<Table.Footer current={1} total={5} prev={prevMock}  next={nextMock}/>);

            const nextButton = screen.getByText('Next');
            
            await userEvent.click(nextButton);


            expect(nextMock).toHaveBeenCalled();
        })

    })

})