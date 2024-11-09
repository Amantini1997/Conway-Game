import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export const Input = ({ name, control, label }: any) => (
	<Controller
		name={name}
		control={control}
		render={({ field: { ref: fieldRef, ...field }, formState: { errors } }) => (
			<TextField
				{...field}
				label={label}
				value={field.value}
				error={!!errors[name]}
				helperText={errors[name]?.message as string}
			/>
		)}
	/>
);