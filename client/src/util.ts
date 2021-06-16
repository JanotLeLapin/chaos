export const secondsToString = (seconds: number) => {
  if (seconds < 60) return seconds + ' seconds';

  let m = Math.floor(seconds / 60);
  let s = Math.floor(seconds % 60);
  if (m < 60)
    return (
      m +
      ' minute' +
      (m === 1 ? '' : 's') +
      (s === 0 ? '' : ', ' + s + ' second' + (s === 1 ? '' : 's'))
    );

  let h = Math.floor(m / 60);
  m = Math.floor(m % 60);
  s = Math.floor(s % 60);
  return (
    h +
    ' hour' +
    (h === 1 ? '' : 's') +
    (m === 0 ? '' : ', ' + m + ' minute' + (m === 1 ? '' : 's')) +
    (s === 0 ? '' : ', ' + s + ' second' + (s === 1 ? '' : 's'))
  );
};
