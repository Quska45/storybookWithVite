import { render, screen, fireEvent } from '@testing-library/svelte';
// import App from '../src/App.svelte';
import App from '../src/stories/Button.svelte';

const backgroundColor = '#72e1a9';

test("says 'hello world!'", () => {
    render(App, { props: {backgroundColor: '#72e1a9'} });
    const node = screen.queryByText("Hello world!");
    // expect(node).not.toBeNull();
    expect(node).toBeInTheDocument();
})

test("Counter", async () => {
    render(App, { props: {backgroundColor: '#72e1a9'} });
    const div = screen.queryByText("Clicks: 0");
    await fireEvent.click( div );
    expect(screen.getByText( 'Clicks: 1' )).toBeInTheDocument();
})