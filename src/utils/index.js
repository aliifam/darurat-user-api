// check if the location is in the radius of the user and add distance property to the faskes
export const haversine = (lat, lon, curLat, curLon) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(curLat - lat); // deg2rad below
  const dLon = deg2rad(curLon - lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat)) *
      Math.cos(deg2rad(curLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in km
  const distance = R * c;
  return distance * 1000; // convert to meter
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};
