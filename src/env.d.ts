/// <reference path="../.astro/types.d.ts" />

interface Window {
  t?: (key: string, ...args: any[]) => string;
}