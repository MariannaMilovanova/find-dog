import {filter, isEmpty, get} from 'lodash';


export const applyFilters = (markers, filters, isPetChanged) => {
  const foundOrLost = get(filters, 'foundOrLost', false);
  const species = get(filters, 'species', false);
  const breed = get(filters, 'breed', false);
  const radius = get(filters, 'radius', false);

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
  if (isEmpty(newMarkers)) return 'No Result Was Found';
  return newMarkers;
};