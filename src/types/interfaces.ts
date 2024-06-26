export interface MenuListInterface<T> {
	id: number,
	name: string,
	created_at: Date | string,
	updated_at: Date | string,
	products: T
}