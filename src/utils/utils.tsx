export const distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = Math.round(R * c * 1000); // distance in m
  return d;
}

export const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
}

export const formatTimeStamp = (timestamp: number) => {
  let date = new Date(timestamp);
  let options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return (date.toLocaleString('cs-CZ', options));
}

export const findClosestTimestamp = (timestamps: number[], currentTime: number): number => {
  let closestTimestamp = timestamps[0];
  let minDiff = Math.abs(timestamps[0] - currentTime);

  timestamps.forEach((timestamp) => {
    const diff = Math.abs(timestamp - currentTime);
    if (diff < minDiff) {
      minDiff = diff;
      closestTimestamp = timestamp;
    }
  });

  return closestTimestamp;
};