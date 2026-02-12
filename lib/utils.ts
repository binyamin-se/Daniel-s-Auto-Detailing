import { DetailPackage, VehicleSize } from "@/lib/types";

export const classNames = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const formatPrice = (value: number) => `$${value.toLocaleString()}`;

export const startingAt = (pkg: DetailPackage, size: VehicleSize) => formatPrice(pkg.prices[size]);
