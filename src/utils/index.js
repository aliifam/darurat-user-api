// check if the location is in the radius of the user and add distance property to the faskes
export const haversine = (lat, lon, curLat, curLon) => {
  const R = 6371e3; // metres
  const φ1 = (lat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (curLat * Math.PI) / 180;
  const Δφ = ((curLat - lat) * Math.PI) / 180;
  const Δλ = ((curLon - lon) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return d;
};

// order the location by distance from the user
