// I created this provider based on the mentorship of Sergio Fransisco
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../services/FetchAPI';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAPI().then((result) => setData(result));
  }, []);

  const value = useMemo(() => ({
    data,
  }), [data]);

  return (
    <StarWarsContext.Provider value={ value }>
      {children}
    </StarWarsContext.Provider>
  );
}
StarWarsProvider.propTypes = {
  children: PropTypes.func.isRequired };
