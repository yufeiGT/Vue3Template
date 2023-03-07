export type chartType = "line" | "bar";

export interface Axis {
  name: string;
  position?: "top" | "bottom" | "left" | "right";
  offset?: number;
}

export interface SeriesItem {
  name: string;
  type?: chartType;
  axisIndex?: number;
  seriesOption?: object;
}

export interface SeriesData {
  value: number;
  index: number | string;
}
