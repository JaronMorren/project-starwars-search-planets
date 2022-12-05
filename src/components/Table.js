import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Table() {
  const { data } = useContext(StarWarsContext);
  const columnOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [nameFilter, setNameFilter] = useState('');
  const [infoFilter, setInfoFilter] = useState([]);
  const [filters, setFilters] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: '0',
  });
  const [numberFilter, setNumberFilter] = useState([]);
  const [singleFilter, setSingleFilter] = useState(columnOptions);

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const filterButton = () => {
    setNumberFilter([...numberFilter, filters]);
    const stopFilterRepeat = singleFilter.filter((option) => option
    !== filters.columnFilter);
    setSingleFilter(stopFilterRepeat); // this variable within the filter button function prevents filters repeating itself
  };
  // console.log(numberFilter);

  useEffect(() => { // Sergio Francisco's mentorship helped me to create the filterFunction.
    const filterFunction = () => {
      let planets = data;

      planets = data.filter((element) => element
        .name.toLowerCase().includes(nameFilter.toLowerCase())); // this changes all search data to lower case letters to prevent search discrepancies
      // https://stackoverflow.com/questions/63877217/change-the-search-term-to-lower-case-in-reactjs

      numberFilter.forEach((element) => {
        if (element.comparisonFilter === 'maior que') {
          planets = planets.filter(
            (planet) => (Number(planet[element.columnFilter] !== Number)
          && Number(planet[element.columnFilter]) > Number(element.valueFilter)),
          );
        }
        if (element.comparisonFilter === 'menor que') {
          planets = planets.filter(
            (planet) => (Number(planet[element.columnFilter] !== Number))
          && Number(planet[element.columnFilter]) < Number(element.valueFilter),
          );
        }
        if (element.comparisonFilter === 'igual a') {
          planets = planets.filter(
            (planet) => (Number(planet[element.columnFilter] !== Number)
          && Number(planet[element.columnFilter]) === Number(element.valueFilter)),
          );
        }// I changed switch case condition to if else because it has a better coverage test percentage
        // similar doubt : https://trybecourse.slack.com/archives/C03G5SRQSLE/p1666384155632839
      });
      setFilters({ ...filters, columnFilter: singleFilter[0] });
      setInfoFilter(planets);
    };
    filterFunction();
  }, [data, nameFilter, numberFilter, singleFilter]);

  // this function removes one filter at a time.
  const removeFilter = (event) => {
    const removeNumbers = numberFilter.filter((element) => (
      element.columnFilter !== event.target.id
    ));
    setSingleFilter([...singleFilter, event.target.id]);
    setNumberFilter(removeNumbers);
  };

  // this function removes all filters at once.
  const removeAllFilters = () => {
    setNumberFilter([]);
    setSingleFilter([]);
  };
  // this site showed me how to map the filters correctly // https://refine.dev/blog/react-search-bar-and-filtering/
  return (
    <>
      <form>
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            type="text"
            name="name-filter"
            placeholder="search"
            value={ nameFilter }
            onChange={ (element) => setNameFilter(element.target.value) }
          />
        </label>
        <label
          htmlFor="columnFilter"
        >
          Column
          <select
            data-testid="column-filter"
            name="columnFilter"
            value={ filters.columnFilter }
            onChange={ handleChange }
          >
            {
              singleFilter.map((element) => (
                <option key={ element }>{element}</option>
              ))
            }
          </select>
        </label>
        <label
          htmlFor="comparisonFilter"
        >
          Compare
          <select
            data-testid="comparison-filter"
            name="comparisonFilter"
            value={ filters.comparisonFilter }
            onChange={ handleChange }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label
          htmlFor="valueFilter"
        >
          <input
            id="valueFilter"
            name="valueFilter"
            type="number"
            data-testid="value-filter"
            placeholder="0"
            value={ filters.valueFilter }
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterButton }
        >
          Filter
        </button>
        <div>
          {
            numberFilter.map((element, index) => (
              <p
                key={ `${element.columnFilter} button${element.comparisonFilter}` }
                data-testid="filter"
              >
                {`${element.columnFilter} 
                ${element.comparisonFilter} ${element.valueFilter}`}
                <button
                  type="button"
                  key={ `${element.columnFilter} ${index}` }
                  id={ element.columnFilter }
                  onClick={ removeFilter }
                >
                  Remove Filter
                </button>
              </p>
            ))
          }
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ removeAllFilters }
          >
            Remove All Filters
          </button>
        </div>
      </form>
      <h1> Star Wars</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            infoFilter.map((element) => (
              <tr key={ element.name }>
                <td>{ element.name }</td>
                <td>{ element.rotation_period }</td>
                <td>{ element.orbital_period }</td>
                <td>{ element.diameter }</td>
                <td>{ element.climate }</td>
                <td>{ element.gravity }</td>
                <td>{ element.terrain }</td>
                <td>{ element.surface_water }</td>
                <td>{ element.population }</td>
                <td>{ element.films }</td>
                <td>{ element.created }</td>
                <td>{ element.edited }</td>
                <td>{ element.url }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}
