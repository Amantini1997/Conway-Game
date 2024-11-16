import { IBoardState, IBoardSize } from '../types/board.types';
import { Form, InputsContainer, Subtitle, TitleContainer } from './startPage.styles';
import { Button, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './startPage.validators';
import { Input } from './input.component';
import { importData } from '../helpers/saving.helpers';

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
			<Button variant='contained' component='label' onClick={() => importData(onSubmit)}>
				Import
			</Button>
		</Form>
	);
};
