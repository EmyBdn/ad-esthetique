import { DiscountType } from "@/../prisma/generated/prisma/client";

export function applyDiscount(
  price: number,
  discountType: DiscountType,
  value: number,
) {
  if (discountType === "PERCENTAGE") {
    return Math.max(0, price - price * (value / 100));
  }

  return Math.max(0, price - value);
}

export function isDiscountActive(startDate: Date, endDate: Date) {
  const now = new Date();

  return startDate <= now && endDate >= now;
}

export function getActiveDiscountForService(service: any) {
  const discount =
    service.discount ??
    service.subcategory?.discount ??
    service.subcategory?.category?.discount;

  if (!discount) {
    return null;
  }

  if (!isDiscountActive(discount.startDate, discount.endDate)) {
    return null;
  }

  return discount;
}

export function getDiscountedPrice(service: any) {
  const discount = getActiveDiscountForService(service);

  const price = Number(service.price);

  if (!discount) {
    return price;
  }

  return applyDiscount(price, discount.discountType, Number(discount.value));
}
