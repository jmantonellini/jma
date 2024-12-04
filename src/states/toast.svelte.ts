import { getContext, onDestroy, setContext } from 'svelte';
import type { Toast, ToastTypes } from '$lib/types';

export class ToastState {
	toasts = $state<Toast[]>([]);
	toastToTimeoutMap = new Map<number, number>();

	constructor() {
		onDestroy(() => {
			for (const timeout of this.toastToTimeoutMap.values()) {
				clearTimeout(timeout);
			}
			this.toastToTimeoutMap.clear();
		});
	}

	add(message: string, type: ToastTypes, timeout: number = 5000) {
		const id = Math.floor(Math.random() * 10000);

		this.toasts.push({ id, type, message, timeout });

		this.toastToTimeoutMap.set(
			id,
			window.setTimeout(() => {
				this.remove(id);
			}, timeout)
		);
	}

	remove(id: number) {
		const timeout = this.toastToTimeoutMap.get(id);
		if (timeout) {
			clearTimeout(timeout);
			this.toastToTimeoutMap.delete(id);
		}
		this.toasts = this.toasts.filter((toast) => toast.id !== id);
	}
}

const TOAST_KEY = Symbol('TOAST');

export function setToastState() {
	return setContext(TOAST_KEY, new ToastState());
}

export function getToastState() {
	return getContext<ReturnType<typeof setToastState>>(TOAST_KEY);
}
