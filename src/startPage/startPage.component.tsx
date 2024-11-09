import { IBoardState, IBoardSize } from '../types/board.types';
import { Form, InputsContainer, Subtitle, TitleContainer } from './startPage.styles';
import { Button, TextField, Divider } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './startPage.validators';
import { ChangeEvent } from 'react';

const Input = ({ name, control, label }: any) => (
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

type FormType = {
	rows: number;
	cols: number;
};

type Props = {
	defaultBoardSize?: IBoardSize;
	onInitialiseBoardHistory: (history: IBoardState[], size: IBoardSize) => void;
};

export const StartPage = ({ onInitialiseBoardHistory, defaultBoardSize }: Props) => {
	const formData = useForm<FormType>({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: defaultBoardSize,
	});
	const { control, handleSubmit, formState: { isValid } } = formData;

	const onSubmit = (size: FormType) => onInitialiseBoardHistory([], size);

	const onImportClick = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type === "application/json") {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const { history, size } = JSON.parse(e.target?.result as string);
					onInitialiseBoardHistory(history, size);
				} catch (error) {
					alert('Invalid JSON file');
				}
			};
			reader.readAsText(file);
		} else {
			alert('Invalid JSON file');
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<TitleContainer>
				<Subtitle>
					To start, select the grid dimensions
					<br />
					(min: 3, max: 1,000)
				</Subtitle>
			</TitleContainer>
			<InputsContainer>
				<Input
					control={control}
					name='rows'
					label='Rows'
				/>
				<Input
					control={control}
					name='cols'
					label='Columns'
				/>
			</InputsContainer>
			<Button variant='contained' color='info' disabled={!isValid} type='submit'>Confirm</Button>
			<Divider>Or</Divider>
			<Button variant='contained' component='label'>
				<input hidden type='file' accept='application/JSON' onChange={onImportClick} />
				Import
			</Button>
		</Form>
	);
};
