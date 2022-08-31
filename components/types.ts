/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import type { ImageProps } from "next/image";
import * as React from "react";

export enum Status {
  ACTIVE = "Active",
  IDLE = "Idle",
  ERROR = "Error",
}

export type StyleProps = {
  style?: React.CSSProperties | undefined;
};

export type ClassnameProps = {
  className?: string | undefined;
};

export type ChildrenProps = {
  children?: React.ReactNode | undefined;
};

export type AvailableRecipeStep = {
  type: string;
  id: number;
  frRecipeId: number;
  equipId?: number | null;
  equipName?: string | null;
  equipIcon?: string;
  processName?: string;
  frMcCat?: number;
  queue: number;
};

export type StylingProps = StyleProps & ClassnameProps;
export type PublicPath = string;
export type NextImageSrc = ImageProps["src"];
