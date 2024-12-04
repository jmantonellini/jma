// place files you want to import through the `$lib` alias in this folder.

export function slugify(text: string) {
	const from = 'áàäâãéèëêíìïîóòöôõúùüûñç';
	const to = 'aaaaaeeeeiiiiooooouuuunc';
	const mapping: { [key: string]: string } = {};

	for (let i = 0; i < from.length; i++) {
		mapping[from.charAt(i)] = to.charAt(i);
	}

	return text
		.split('')
		.map((char) => mapping[char] || char)
		.join('')
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '')
		.toLowerCase();
}

export enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

export function isAdmin(role: string) {
	return role === Roles.ADMIN;
}

export function capitalize(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	if (date) {
		const dateToFormat = new Date(date.replaceAll('-', '/'));
		const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
		return dateFormatter.format(dateToFormat);
	}
	return '';
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
