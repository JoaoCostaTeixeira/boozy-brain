export function calculateScore(
  timeTakenToRespond,
  maxTimeAllowed,
  maxPoints,
  minPoints
) {
  if (timeTakenToRespond <= 0) {
    return maxPoints;
  } else if (timeTakenToRespond >= maxTimeAllowed) {
    return minPoints;
  } else {
    const points =
      (maxPoints - minPoints) * (1 - timeTakenToRespond / maxTimeAllowed) +
      minPoints;
    return Math.floor(points);
  }
}
