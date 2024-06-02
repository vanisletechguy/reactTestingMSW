//import { render, screen, fireEvent } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import SummaryForm from './SummaryForm';
import userEvent from '@testing-library/user-event';

test('Initial conditions', () => {

    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
        name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole('button', {name: /confirm order/i });
    expect(confirmButton).toBeDisabled();

}); 


test('Checkbox enables button on first click and disables on second click', async () => {

    const user = userEvent.setup();
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
        name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole('button', { name: /confirm order/i });

    //    fireEvent.click(checkbox);
    await user.click(checkbox);
    expect(confirmButton).toBeEnabled();

    //    fireEvent.click(checkbox);
    await user.click(checkbox);
    expect(confirmButton).toBeDisabled();

});

test("popover responds to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    //popover starts out hidden
    const nullPopover = screen.queryByText(/No ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    //popover appears on mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(/No ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    //popover disapears when we mouse out...eventually?
    await user.unhover(termsAndConditions);
    await user.unhover(termsAndConditions);
    expect(popover).not.toBeInTheDocument();

});




