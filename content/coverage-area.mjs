// The same approximate boundary displayed on the main coverage map.
// Coordinates are [latitude, longitude]. Attendance is confirmed by phone.
export const coverageBoundary = [
  [43.18, 23.65], [43.19, 23.79], [42.99, 24.0],
  [42.85, 24.0], [42.77, 23.7], [42.93, 23.61]
];

export function insideCoverage(point) {
  const [lat, lon] = point;
  let inside = false;
  for (let i = 0, j = coverageBoundary.length - 1; i < coverageBoundary.length; j = i++) {
    const [yi, xi] = coverageBoundary[i], [yj, xj] = coverageBoundary[j];
    if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
