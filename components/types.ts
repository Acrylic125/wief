/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import type { ImageProps } from "next/image";
import * as React from "react";

export type StyleProps = {
  style?: React.CSSProperties | undefined;
};

export type ClassnameProps = {
  className?: string | undefined;
};

export type ChildrenProps = {
  children?: React.ReactNode | undefined;
};

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type ID = string | number;

export type StylingProps = StyleProps & ClassnameProps;
export type PublicPath = string;
export type NextImageSrc = ImageProps["src"];
