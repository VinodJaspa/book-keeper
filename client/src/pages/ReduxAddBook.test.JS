import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddBookForm from './AddBookForm'; // Adjust import path as needed

const mockStore = configureStore([]);
describe('AddBookForm with Redux', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: { id: 'user123', name: 'Test User' }, // Mock your auth state as needed
      },
    });

    render(
      <Provider store={store}>
        <AddBookForm />
      </Provider>
    );
  });

  it('dispatches the correct actions on form submit', async () => {
    // Simulate form submission
    fireEvent.click(screen.getByText('Save Book'));
  });
});
