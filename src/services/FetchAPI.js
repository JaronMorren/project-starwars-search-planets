const fetchAPI = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    console.log({ response });
    const { results } = await response.json();
    results.forEach((element) => delete element.residents); // this loop method removes the residents element from the API objects
    console.log(results);
    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetchAPI;
