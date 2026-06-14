export const DEFAULT_SERVICE_STATION = {
  name: 'ShopEZ Service Station',
  address: 'MG Road, Bengaluru, Karnataka',
  latitude: 12.9756,
  longitude: 77.6055,
  radiusKm: 15
};

const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const calculateDistanceKm = (location, station = DEFAULT_SERVICE_STATION) => {
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(Number(location.latitude) - Number(station.latitude));
  const deltaLng = toRadians(Number(location.longitude) - Number(station.longitude));
  const stationLat = toRadians(Number(station.latitude));
  const locationLat = toRadians(Number(location.latitude));

  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(stationLat) * Math.cos(locationLat) * Math.sin(deltaLng / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
};

export const getDeliveryStatus = (location, station = DEFAULT_SERVICE_STATION) => {
  if (!location) return { eligible: false, distanceKm: null };

  const distanceKm = calculateDistanceKm(location, station);
  return {
    eligible: distanceKm <= station.radiusKm,
    distanceKm: Number(distanceKm.toFixed(2))
  };
};
