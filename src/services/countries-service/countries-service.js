const COUNTRIES_API_ENDPOINT = process.env.REACT_APP_COUNTRIES_API_ENDPOINT

const parameters = 'fields=name;flag;population;region;capital;borders';

const validateData = ([country]) => {
  if (country === undefined) {
    throw Error('No country found');
  }

  return country;
};

const formatCountryDetails = ([country, countries]) => ({
  ...country,
  population: country.population.toLocaleString(),
  currencies: country.currencies.map(({ name }) => name).join(', '),
  languages: country.languages.map(({ name }) => name).join(', '),
  topLevelDomain: country.topLevelDomain.join(', '),
  borders: countries.map(({ name }) => name)
});

class CountriesService {
  fetchAllCountries() {
    return this.fetchData(`all?${parameters}`);
  }

  fetchCountriesByRegion(region) {
    return this.fetchData(`region/${region}?${parameters}`);
  }

  fetchCountryByFullName(name) {
    const params = parameters + ';nativeName;subRegion;topLevelDomain;currencies;languages';
    return this.fetchData(`name/${name}?fullText=true&${params}`)
      .then(validateData)
      .then(country =>
        country.borders?.length < 1 ?
          [country, []] :
          Promise.all([country, this.fetchCountriesByCodes(country.borders)])
      )
      .then(formatCountryDetails)
      .catch(error => {
        console.error(error);
        return null;
      });
  }

  fetchCountriesByCodes(codes = []) {
    return this.fetchData(`alpha?codes=${codes.join(';')}&fields=name`);
  }

  fetchData(url, options) {
    return fetch(`${COUNTRIES_API_ENDPOINT}/${url}`, options)
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          throw data;
        }
        return data;
      })
      .catch(error => {
        console.error(error);
        return [];
      });
  }
}

const countriesService = new CountriesService();

export default countriesService;
