import { IBoardState, IBoardSize, ExportBoardData } from '../types/board.types';
import { Form, InputsContainer, Subtitle, TitleContainer } from './startPage.styles';
import { Button, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './startPage.validators';
import { ChangeEvent } from 'react';
import { Input } from './input.component';

type FormType = {
	rows: number;
	cols: number;
};

type Props = {
	defaultBoardSize?: IBoardSize | undefined;
	onSubmit: (history: IBoardState[], size: IBoardSize) => void;
};
export const StartPage = ({ onSubmit, defaultBoardSize }: Props) => {
	const formData = useForm<FormType>({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: defaultBoardSize,
	});
	const { control, handleSubmit, formState: { isValid } } = formData;

	const importBoard = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type === "application/json") {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const { history, size } = JSON.parse(e.target?.result as string) as ExportBoardData;
					onSubmit(history, size);
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
		<Form onSubmit={handleSubmit((size: FormType) => onSubmit([], size))}>
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
				<input hidden type='file' accept='application/JSON' onChange={importBoard} />
				Import
			</Button>
		</Form>
	);
};
