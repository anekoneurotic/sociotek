export type Coordinates = readonly [x: number, y: number];
export type Dimensions = readonly [width: number, height: number];

export type RgbColorCode = `rgb(${number}, ${number}, ${number})`;
export type RgbaColorCode = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HexColorCode = `#${string}`;

export type ColorCode = RgbColorCode | RgbaColorCode | HexColorCode;
