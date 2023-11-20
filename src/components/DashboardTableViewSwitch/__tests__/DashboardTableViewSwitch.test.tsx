import { screen, render } from '@testing-library/react';
import DashboardTableViewSwitch from '..';
import userEvent from '@testing-library/user-event';

const mockEmit = jest.fn();

describe('Dashboard Table View Switch', () => {
    describe('Render', () => {
        it('render labels', () => {
            render(<DashboardTableViewSwitch  options={["students", "teachers"]} defaultValue='students' $emit={mockEmit} />);

            const labels = screen.getAllByTestId('switch-label');

            expect(labels.length).toEqual(2);
        }),
        it('render correct label names in correct order', () => {
            render(<DashboardTableViewSwitch  options={["students", "teachers"]} defaultValue='students' $emit={mockEmit} />);

            const labels = screen.getAllByTestId('switch-label');

            expect(labels[0]).toHaveTextContent('students');
            expect(labels[1]).toHaveTextContent('teachers');
        })
    });

    describe('Behavior', () => {
        it('should already check radio with default value', () => {
            render(<DashboardTableViewSwitch  options={["students", "teachers"]} defaultValue='students' $emit={mockEmit} />);

            const radioInputs = screen.getAllByTestId('switch-input');

            expect(radioInputs[0]).toBeChecked();
            expect(radioInputs[1]).not.toBeChecked();

        }),
        it('should emit label name when clicked', async () => {
            render(<DashboardTableViewSwitch  options={["students", "teachers"]} defaultValue='students' $emit={mockEmit} />);

            const teacherLabel = screen.getAllByTestId('switch-label')[1];

            await userEvent.click(teacherLabel)

            expect(mockEmit).toBeCalled();

        })
    })
})