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
  return words?.length > 10 ? words?.slice(0, 10)?.join(" ") + "..." : text;
};

export const zonesWithPrices = [
  // الأقرب - نفس المنطقة والمناطق المجاورة مباشرة
  { zone: "rod_el_farag", label: "روض الفرج", price: 15 },
  { zone: "boulaq", label: "بولاق", price: 20 },
  { zone: "shubra", label: "شبرا", price: 20 },
  { zone: "sahel", label: "الساحل", price: 20 },
  { zone: "shubra_el_kheima", label: "شبرا الخيمة", price: 25 },
  { zone: "imbaba", label: "إمبابة", price: 25 },
  { zone: "warraq", label: "الوراق", price: 25 },
  { zone: "sharabeya", label: "الشرابية", price: 25 },

  // قريب - وسط القاهرة والمناطق القريبة
  { zone: "downtown", label: "وسط البلد", price: 30 },
  { zone: "abbassia", label: "العباسية", price: 30 },
  { zone: "zamalek", label: "الزمالك", price: 30 },
  { zone: "hadayek_el_qobba", label: "حدائق القبة", price: 30 },
  { zone: "ain_shams", label: "عين شمس", price: 30 },
  { zone: "zeitoun", label: "الزيتون", price: 30 },
  { zone: "matareya", label: "المطرية", price: 30 },
  { zone: "garden_city", label: "جاردن سيتي", price: 35 },
  { zone: "sayeda_zeinab", label: "السيدة زينب", price: 35 },
  { zone: "masr_el_qadima", label: "مصر القديمة", price: 35 },

  // متوسط - مناطق القاهرة الرئيسية
  { zone: "dokki", label: "الدقي", price: 35 },
  { zone: "mohandessin", label: "المهندسين", price: 35 },
  { zone: "agouza", label: "العجوزة", price: 35 },
  { zone: "heliopolis", label: "هليوبوليس", price: 40 },
  { zone: "nasr_city", label: "مدينة نصر", price: 40 },
  { zone: "masr_el_gdeda", label: "مصر الجديدة", price: 40 },
  { zone: "nozha", label: "النزهة", price: 40 },
  { zone: "basateen", label: "البساتين", price: 40 },
  { zone: "dar_el_salam", label: "دار السلام", price: 40 },
  { zone: "manial", label: "المنيل", price: 40 },
  { zone: "zawya_el_hamra", label: "الزاوية الحمراء", price: 35 },
  { zone: "boulaq_el_dakrour", label: "بولاق الدكرور", price: 40 },

  // بعيد شوية - مناطق أطراف القاهرة والجيزة
  { zone: "mokattam", label: "المقطم", price: 45 },
  { zone: "maadi", label: "المعادي", price: 45 },
  { zone: "degla", label: "دجلة", price: 50 },
  { zone: "faisal", label: "فيصل", price: 45 },
  { zone: "haram", label: "الهرم", price: 45 },
  { zone: "omraneya", label: "العمرانية", price: 45 },
  { zone: "marg", label: "المرج", price: 45 },
  { zone: "zahraa_el_maadi", label: "زهراء المعادي", price: 50 },
  { zone: "hadayek_el_ahram", label: "حدائق الأهرام", price: 50 },

  // بعيد - المدن والمناطق الجديدة
  { zone: "new_cairo", label: "القاهرة الجديدة", price: 55 },
  { zone: "fifth_settlement", label: "التجمع الخامس", price: 55 },
  { zone: "first_settlement", label: "التجمع الأول", price: 55 },
  { zone: "third_settlement", label: "التجمع الثالث", price: 55 },
  { zone: "katameya", label: "القطامية", price: 55 },
  { zone: "rehab", label: "الرحاب", price: 60 },
  { zone: "shorouk", label: "الشروق", price: 60 },
  { zone: "obour", label: "العبور", price: 60 },
  { zone: "badr", label: "بدر", price: 65 },
  { zone: "october", label: "6 أكتوبر", price: 60 },
  { zone: "sheikh_zayed", label: "الشيخ زايد", price: 60 },

  // الأبعد - مناطق خارج القاهرة الكبرى
  { zone: "helwan", label: "حلوان", price: 55 },
  { zone: "15_mayo", label: "15 مايو", price: 55 },
  { zone: "maasara", label: "المعصرة", price: 50 },
  { zone: "tora", label: "طره", price: 50 },
  { zone: "giza", label: "الجيزة", price: 40 },
  { zone: "munib", label: "المنيب", price: 50 },
  { zone: "hawamdeya", label: "الحوامدية", price: 65 },
  { zone: "kerdasa", label: "كرداسة", price: 65 },
  { zone: "osim", label: "أوسيم", price: 65 },
  { zone: "badrashin", label: "البدرشين", price: 70 },
  // Other
  { zone: "other", label: "أخرى", price: 70 },
];
