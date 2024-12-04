export type MetaData = {
	title: string;
	description: string;
	date: string;
	categories: string[];
	published: boolean;
};

export type Post = MetaData & {
	slug: string;
};

export type ToastTypes = 'info' | 'success' | 'error';
export enum ToastTypeEnum {
	Info = 'info',
	Success = 'success',
	Error = 'error',
}

export type Toast = {
	id: number;
	type: ToastTypes;
	message: string;
	timeout?: number;
};
