export const maskNumber = (val: number, symbol = ' '): string => {

	return val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol)
}
