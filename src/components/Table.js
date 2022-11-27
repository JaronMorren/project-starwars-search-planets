import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Table() {
  const { data } = useContext(StarWarsContext);
  const [nameFilter, setNameFilter] = useState('');
  const [filteredInformation, setFilteredInformation] = useState([]);
  const [filters, setFilters] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: '0',
  });
  const [numbers, setNumbers] = useState([]);
  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const filterButton = () => {
    setNumbers([...numbers, filters]);
  };
  // console.log(numbers);

  useEffect(() => {
    const filterFunction = () => {
      let planets = data;

      planets = data.filter((element) => element
        .name.toLowerCase().includes(nameFilter.toLowerCase()));// https://stackoverflow.com/questions/63877217/change-the-search-term-to-lower-case-in-reactjs

      numbers.forEach((element) => {
        switch (element.comparisonFilter) {
        case 'maior que':
          planets = planets.filter(
            (planet) => (Number(planet[element.columnFilter] !== Number)
          && Number(planet[element.columnFilter]) > Number(element.valueFilter)),
          );
          break;
        case 'menor que':
          planets = planets.filter(
            (planet) => (Number(planet[element.columnFilter] !== Number))
          && Number(planet[element.columnFilter]) < Number(element.valueFilter),
          );
          break;
        case 'igual a':
          planets = planets.filter(
            (planet) => (Number(planet[element.columnFilter] !== Number)
          && Number(planet[element.columnFilter]) === Number(element.valueFilter)),
          );
          break;
        default: // do nothing // https://stackoverflow.com/questions/8021321/what-if-i-dont-write-default-in-switch-case
        }
      });

      setFilteredInformation(planets);
    };
    filterFunction();
  }, [data, nameFilter, numbers]);
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
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
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
            numbers.map((element, index) => (
              <p key={ `${element.columnFilter}-${index}` }>
                {`${element.columnFilter} 
                ${element.comparisonFilter} ${element.valueFilter}`}
              </p>
            ))
          }
        </div>
      </form>
      <table>
        <h1> Star Wars</h1>
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
            filteredInformation.map((element) => (
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
