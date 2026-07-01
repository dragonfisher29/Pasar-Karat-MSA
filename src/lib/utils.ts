export function normalizeWhatsappNumber(input: string) {
  const digits = input.replace(/[^\d]/g, "");

  if (digits.startsWith("0")) {
    return `6${digits}`;
  }

  return digits;
}

export function buildWhatsAppUrl(phone: string, listingName: string) {
  const normalizedPhone = normalizeWhatsappNumber(phone);
  const message = encodeURIComponent(
    `Hi, I'm interested in your item "${listingName}" on Pasar Karat. Is it still available?`,
  );

  return `https://wa.me/${normalizedPhone}?text=${message}`;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function createManageCode() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}
