import { filter, isEmpty, get, inRange } from 'lodash';

export const applyFilters = (markers, filters, isPetChanged) => {
  const foundOrLost = get(filters, 'foundOrLost', false);
  const species = get(filters, 'species', false);
  const breed = get(filters, 'breed', false);
  const radiusData = get(filters, 'radiusData', false);

  let newMarkers = [...markers];

  if (foundOrLost) {
    newMarkers = filter(newMarkers, { info: { foundOrLost } });
  }
  if (species) {
    newMarkers = filter(newMarkers, { info: { species } });
  }
  if (breed && !isPetChanged) {
    newMarkers = filter(newMarkers, { info: { breed } });
  }
  if (radiusData) {
    console.log('1', newMarkers);
    newMarkers = filter(newMarkers, item => radiusData.contains(item.position));
    console.log('2', newMarkers);
  }
  if (isEmpty(newMarkers)) return 'No Result Was Found';

  return newMarkers;
};
