import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import  mockData from './helpers/mockData';
import StarWarsProvider from '../context/StarWarsProvider';
import userEvent from '@testing-library/user-event';


describe('Test the App', () => {
  it('if all inputs are rendered correctly', () => {

    render(
    <StarWarsProvider>
      <App />
    </StarWarsProvider>);

    const nameFilter = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.findByTestId(/'comparison-filter'/i);
    const valueFilter = screen.getByTestId('value-filter');


    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(columnFilter).toHaveLength(5);
    waitFor(() => expect(comparisonFilter).toBeInTheDocument())
    waitFor(() => expect(comparisonFilter).toHaveLength(3))
    expect(valueFilter).toBeInTheDocument();
  });

  it('if the API is called', () => {
      global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledWith('https://swapi.dev/api/planets');
  });

  it('if the filter button renders correctly', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

      const filterButton = screen.getByRole('button', { name: 'Filter' });
      expect(filterButton).toBeInTheDocument();
  });

  it('if remove all filters button renders correctly', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
    <StarWarsProvider>
      <App />
    </StarWarsProvider>);

    const buttonRemoveFilter = screen.getByTestId("button-remove-filters");

    waitFor(() => expect(buttonRemoveFilter).toBeInTheDocument())
  });

 
  it('if the table is rendered with all planets', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

      const table = screen.getAllByRole('row');
      waitFor(() => expect(table).toHaveLength(10));
  });

  it('if the `greater than` comparison  works correctly', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

    const filter = screen.getAllByRole('combobox');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByRole('button', { name: 'Filter' });
    userEvent.selectOptions(filter[0], ['orbital_period']);
    userEvent.selectOptions(filter[1], ['maior que']);
    userEvent.type(valueFilter, '5000');
    userEvent.click(filterButton);
    const result = screen.getAllByRole('row');
    const buttonRemoveFilter = screen.getByText("Remove Filter");
    const planet = screen.findByText("Bespin");


    waitFor(() => expect(result).toHaveLength(1));
    waitFor(() => expect(planet).toBeInTheDocument());
    waitFor(() => expect(buttonRemoveFilter).toBeInTheDocument())
    userEvent.click(buttonRemoveFilter);
    waitFor(() => expect(buttonRemoveFilter).not.toBeInTheDocument())

  
  })

  it('if the `less than`comparison  works correctly', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

    const filter = screen.getAllByRole('combobox');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByRole('button', { name: 'Filter' });

    userEvent.selectOptions(filter[0], ['population']);
    userEvent.selectOptions(filter[1], ['menor que']);
    userEvent.type(valueFilter, "200000");
    userEvent.click(filterButton);
    const result = screen.getAllByRole('row');

    const planet = screen.findByText("Tatooine");
     
    waitFor(() => expect(result).toHaveLength(1));
    waitFor(() => expect(planet).toBeInTheDocument());
// Following doubt on Slack helped me to build this test
    //https://trybecourse.slack.com/archives/C03G5SRQSLE/p1666455730429019?thread_ts=1666384155.632839&cid=C03G5SRQSLE
  })

  it('if the `equals`comparison  works correctly ', () => {
      global.fetch = jest.fn(async () => ({
        json: async () => mockData
      }));

      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>);

      const filter = screen.getAllByRole('combobox');
      const valueFilter = screen.getByTestId('value-filter');
      const filterButton = screen.getByRole('button', { name: 'Filter' });
      userEvent.selectOptions(filter[0], ['rotation_period']);
      userEvent.selectOptions(filter[1], ['igual a']);
      userEvent.type(valueFilter, '26');
      userEvent.click(filterButton);
      const result = screen.getAllByRole('row');

        waitFor(() => expect(result).toHaveLength(1));
  });
  it('if comparison filter combined with text input works correctly', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

      const filter = screen.getAllByRole('combobox');
      const valueFilter = screen.getByTestId('value-filter');
      const filterButton = screen.getByRole('button', { name: 'Filter' });
      userEvent.selectOptions(filter[0], ['orbital_period']);
      userEvent.selectOptions(filter[1], ['maior que']);
      userEvent.type(valueFilter, '5000');
      userEvent.click(filterButton);
      const result = screen.getAllByRole('row');
      const nameFilter = screen.getByRole('textbox', { type: 'text' });
      userEvent.type(nameFilter, 't' );
      const result2 = screen.getAllByRole('row');

      waitFor(() => expect(result).toHaveLength(1));
      waitFor(() => expect(result2).toHaveLength(0));
  });

});