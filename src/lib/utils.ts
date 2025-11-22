/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ceilPrice(price: number) {
  return Math.ceil(price);
}

export function getErrorsMessage(error: any) {
  return (
    error?.response?.data?.error?.[0]?.message ||
    error?.response?.data?.message ||
    "حدث خطأ ما"
  );
}

export const sliceText = (text: string) => {
  const words = text?.split(" ");
  return words?.length > 15 ? words?.slice(0, 15)?.join(" ") + "..." : text;
};

export const zonesWithPrices = [
  { zone: "nasr_city", label: "مدينة نصر", price: 30 },
  { zone: "korba", label: "مصر الجديدة", price: 35 },
  { zone: "zamalek", label: "الزمالك", price: 40 },
  { zone: "maadi", label: "المعادي", price: 45 },
  { zone: "mokattam", label: "المقطم", price: 40 },
  { zone: "shubra", label: "شبرا", price: 35 },
  { zone: "dokki", label: "الدقي", price: 30 },
  { zone: "mohandessin", label: "المهندسين", price: 35 },
  { zone: "october", label: "6 أكتوبر", price: 50 },
  { zone: "sheikh_zayed", label: "الشيخ زايد", price: 50 },
  { zone: "fifth_settlement", label: "التجمع الخامس", price: 45 },
  { zone: "madinaty", label: "مدينتي", price: 55 },
  { zone: "obour", label: "العبور", price: 45 },
  { zone: "ain_shams", label: "عين شمس", price: 30 },
  { zone: "abbassia", label: "العباسية", price: 25 },
  { zone: "garden_city", label: "جاردن سيتي", price: 40 },
  { zone: "heliopolis", label: "هليوبوليس", price: 35 },
  { zone: "new_cairo", label: "القاهرة الجديدة", price: 45 },
  { zone: "faisal", label: "فيصل", price: 35 },
  { zone: "haram", label: "الهرم", price: 35 },
  { zone: "boulaq", label: "بولاق", price: 25 },
  { zone: "imbaba", label: "إمبابة", price: 25 },
  { zone: "warraq", label: "الوراق", price: 25 },
  { zone: "kit_kat", label: "الكيت كات", price: 25 },
  { zone: "basateen", label: "البساتين", price: 30 },
  { zone: "shalat", label: "شيراتون", price: 40 },
  { zone: "katameya", label: "القطامية", price: 45 },
  { zone: "maadi_degla", label: "دجلة المعادي", price: 45 },
];
