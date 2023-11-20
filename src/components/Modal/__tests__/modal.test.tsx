import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from '..';


const mockToggleFn = jest.fn();


describe('Modal', () => {
    describe('Render', () => {
        it('should render modal component', () => {
            render(<Modal open toggle={mockToggleFn}>Test</Modal>)


            expect(screen.getByTestId('modal')).toBeInTheDocument();
        })
    })
})