import * as Yup from 'yup';

const transformToNumber = (value: string) => {
	const valueAsNumber = Number(value);
	return isNaN(valueAsNumber) ? '' : valueAsNumber;
};

const numberValidator = Yup.number()
	.required('This is required')
	.typeError('Invalid number')
	.transform(transformToNumber)
	.min(3, 'Min 3')
	.max(1000, 'Max 1,000');

export const schema = Yup.object().shape({
	rows: numberValidator,
	cols: numberValidator,
});