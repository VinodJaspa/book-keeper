import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddBookForm } from './AddBookForm'; // Adjust the import path as per your file structure
import { Provider } from 'react-redux'; // If using Redux
import { store } from '@/redux/store';


describe('AddBookForm', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <AddBookForm />
      </Provider>
    );
  });

  it('renders add book form correctly', () => {
    // Check if the form and required elements are rendered
    expect(screen.getByText('Add New Book')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Book title')).toBeInTheDocument();
    expect(screen.getByText('Save Book')).toBeInTheDocument();
  });

  it('allows user to add sections and subsections', () => {
    // sections and subsections
    fireEvent.click(screen.getByText('+')); // Add section
    fireEvent.change(screen.getByPlaceholderText('Section name'), { target: { value: 'Section 1' } });
    fireEvent.click(screen.getByText('+')); // Add subsection
    fireEvent.change(screen.getByPlaceholderText('Subsection Title'), { target: { value: 'Subsection 1' } });

    // Check if the added section and subsection are displayed
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Subsection 1')).toBeInTheDocument();
  });

  it('submits the form correctly', async () => {
    // Simulate filling out the form and submitting
    fireEvent.change(screen.getByPlaceholderText('Book title'), { target: { value: 'Test Book' } });
    fireEvent.click(screen.getByText('+')); // Add section
    fireEvent.change(screen.getByPlaceholderText('Section name'), { target: { value: 'Section 1' } });
    fireEvent.click(screen.getByText('+')); // Add subsection
    fireEvent.change(screen.getByPlaceholderText('Subsection Title'), { target: { value: 'Subsection 1' } });
    fireEvent.click(screen.getByText('Save Book'));
  });
});
