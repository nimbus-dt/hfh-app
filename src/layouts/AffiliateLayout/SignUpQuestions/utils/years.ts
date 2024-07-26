const currentYear = new Date().getFullYear();

const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

export default years;
