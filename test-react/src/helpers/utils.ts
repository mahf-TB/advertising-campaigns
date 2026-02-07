// Date utilities
export const formatDate = (
    date: Date | string,
    format: string = "DD/MM/YYYY",
    locale: string = "fr-FR"
): string => {
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return "";

    const day = String(d.getDate()).padStart(2, "0");
    const monthNumber = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear());
    const monthShort = new Intl.DateTimeFormat(locale, { month: "short" }).format(d);
    const monthLong = new Intl.DateTimeFormat(locale, { month: "long" }).format(d);

    const tokens: Record<string, string> = {
        "MMMM": monthLong,
        "MMM": monthShort,
        "MM": monthNumber,
        "DD": day,
        "YYYY": year,
        "mmmm": monthLong,
        "mmm": monthShort,
        "mm": monthNumber,
        "dd": day,
        "yyyy": year,
    };

    return format.replace(
        /MMMM|MMM|MM|DD|YYYY|mmmm|mmm|mm|dd|yyyy/g,
        (match) => tokens[match] ?? match
    );
};

export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const isStartDateAfterEndDate = (
    startDate: Date | string,
    endDate: Date | string
): boolean => {
    return new Date(startDate) > new Date(endDate);
};

export const isDateExpired = (date: Date | string): boolean => {
    return new Date(date) < new Date();
};

// Currency utilities
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

export const convertCurrency = (amount: number, fromRate: number, toRate: number): number => {
    return (amount / fromRate) * toRate;
};

// SNS (Social Network Services) utilities
export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};

export const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);
};

export const truncateString = (text: string, length: number): string => {
    return text.length > length ? text.substring(0, length) + '...' : text;
};