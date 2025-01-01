import { SVGProps } from "react";
export * from "./user";
export * from "./skill";
export * from "./global";
export * from "./project";
export * from "./experience";
export * from "./blog";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
