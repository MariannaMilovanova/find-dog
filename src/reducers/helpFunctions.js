import {filter, isEmpty, includes, get} from 'lodash';


export const applyFilters = (markers, filters, isPetChanged) => {
  const foundOrLost = get(filters, 'foundOrLost', false);
  const species = get(filters, 'species', false);
  const breed = get(filters, 'breed', false);

  let newMarkers = [...markers];

  if (foundOrLost) {
    newMarkers = filter(newMarkers, {info: {foundOrLost}});
  }
  if (species) {
    newMarkers = filter(newMarkers, {info: {species}});
  }
  if (breed && !isPetChanged) {
    newMarkers = filter(newMarkers, {info: {breed}});
  }
  return newMarkers;
};