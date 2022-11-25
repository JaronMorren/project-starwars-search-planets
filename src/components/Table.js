import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { data } = useContext(StarWarsContext);
  const [search, setSearch] = useState('');
  const searchByName = data.filter((el) => el
    .name.toLowerCase().includes(search.toLowerCase()));// https://stackoverflow.com/questions/63877217/change-the-search-term-to-lower-case-in-reactjs
  return (
    <>
      <form>
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            type="text"
            name="name-filter"
            placeholder="search"
            value={ search }
            onChange={ (element) => setSearch(element.target.value) }
          />
        </label>
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
            searchByName.map((element) => (
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

export default Table;
