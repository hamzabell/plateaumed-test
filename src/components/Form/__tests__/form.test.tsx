import { render, screen, within } from '@testing-library/react'
import Form from '..';
import * as yup from 'yup';
import userEvent from '@testing-library/user-event';

const schema = yup.object({
    name: yup.string().required(),
    date: yup.string().email().required().label('Date')
})

const mockSubmit = jest.fn(e => e.preventDefault());


describe('Form', () => {
    describe('Render', () => {
        it('should should render form', () => {
            render(
                <Form schema={schema} submitFn={mockSubmit}>
                    <Form.Input type='text' labelName='Name' placeholder='Name' name="name" />
                    <Form.Input type='date' labelName='Date' placeholder='Date' name="date" />

                    <Form.Button title="Submit"/>
                </Form>
            )


            const form = screen.getByTestId('form');
            const formInputs = screen.getAllByTestId('form-input')
            const formButton = screen.getByText('Submit');




            expect(form).toBeInTheDocument()
            expect(formInputs.length).toEqual(2);
            expect(formButton).toBeInTheDocument();
        })
    }),

    describe('Behavior', () => {
        it('should not submit form data with validation error', async () => {


            const FormComponent = () => (
                <Form schema={schema} submitFn={mockSubmit}>
                    <Form.Input type='text' labelName='Name' placeholder='Name' name="name" />
                    <Form.Input type='date' labelName='Date' placeholder='Date' name="date" />

                    <Form.Button title="Submit" />
                </Form>
            )



            
            render(<FormComponent />)

            const form = screen.getByTestId('form')

            await userEvent.type(within(form).getAllByTestId('form-input')[0], "Akan");

            await userEvent.click(within(form).getByText('Submit'))


            

            expect(within(form).getAllByTestId('form-input')[0]).toHaveValue("Akan");
            expect(within(form).getByText('Date is a required field', { exact: false}))
        })
    })
})