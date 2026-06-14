export const SERVICE_STATION = {
  name: process.env.SERVICE_STATION_NAME || 'ShopEZ Service Station',
  address: process.env.SERVICE_STATION_ADDRESS || 'MG Road, Bengaluru, Karnataka',
  latitude: Number(process.env.SERVICE_STATION_LATITUDE || 12.9756),
  longitude: Number(process.env.SERVICE_STATION_LONGITUDE || 77.6055),
  radiusKm: Number(process.env.DELIVERY_RADIUS_KM || 15)
};

const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const calculateDistanceKm = (from, to = SERVICE_STATION) => {
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(Number(from.latitude) - Number(to.latitude));
  const deltaLng = toRadians(Number(from.longitude) - Number(to.longitude));
  const fromLat = toRadians(Number(to.latitude));
  const toLat = toRadians(Number(from.latitude));

  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(deltaLng / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
};

export const getDeliveryEligibility = (location) => {
  const latitude = Number(location?.latitude);
  const longitude = Number(location?.longitude);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return { eligible: false, distanceKm: null };
  }

  const distanceKm = calculateDistanceKm({ latitude, longitude });
  return {
    eligible: distanceKm <= SERVICE_STATION.radiusKm,
    distanceKm: Number(distanceKm.toFixed(2))
  };
};
