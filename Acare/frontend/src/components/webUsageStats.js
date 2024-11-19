// Data derived from https://gs.statcounter.com/os-market-share/desktop/worldwide/2023
// And https://gs.statcounter.com/os-market-share/mobile/worldwide/2023
// And https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide/2023
// For the month of December 2023

export const desktopOS = [
  {
    label: 'B+',
    value: 72.72,
  },
  {
    label: 'AB',
    value: 16.38,
  },
  {
    label: 'A+',
    value: 3.83,
  },
  {
    label: 'O+',
    value: 2.42,
  },
  {
    label: 'O-',
    value: 4.65,
  },
];

export const platforms = [
  {
    label: 'Mobile',
    value: 59.12,
  },
  {
    label: 'Desktop',
    value: 40.88,
  },
];

const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2));

export const mobileAndDesktopOS = desktopOS.map((item) => ({
  ...item,
  value: normalize(item.value, platforms[0].value),
}));

export const valueFormatter = (item) => `${item.value}%`;