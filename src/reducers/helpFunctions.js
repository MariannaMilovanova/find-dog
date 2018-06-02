import { filter, isEmpty, get, inRange } from 'lodash';

export const applyFilters = (markers, filters, isPetChanged) => {
  const foundOrLost = get(filters, 'foundOrLost', false);
  const species = get(filters, 'species', false);
  const breed = get(filters, 'breed', false);
  const radiusData = get(filters, 'radiusData', false);
  const radius = get(filters, 'radius', false);

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
    const { neLng, neLat, swLng, swLat } = radiusData;
    newMarkers = filter(newMarkers, item => {
      if (
        inRange(item.position.lng, swLng, neLng) &&
        inRange(item.position.lat, swLat, neLat)
      ) {
        console.warn('position', item.position);
        console.warn('lat', swLat, neLat);
        return item;
      }
    });
  }
  if (isEmpty(newMarkers)) return 'No Result Was Found';

  return newMarkers;
};
