import { writable } from 'svelte/store';

export const toasts = writable<Toast[]>([]);

export type ToastTypes = 'info' | 'success' | 'error';

export type Toast = {
	id?: number;
	type: ToastTypes;
	message: string;
	timeout?: number;
};

export const addToast = (newToast: Toast) => {
	const id = Math.floor(Math.random() * 10000);

	const toast: Toast = {
		id,
		timeout: 3000,
		...newToast
	};

	toasts.update((all) => [toast, ...all]);

	if (toast.timeout) {
		setTimeout(() => dismissToast(id), toast.timeout);
	}
};

const dismissToast = (id: number) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};
