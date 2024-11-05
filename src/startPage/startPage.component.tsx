import { IBoardState, IBoardSize } from '../types/board.types';
import { TextField } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
	rows: Yup.number().required(),
	cols: Yup.number().required(),
});

type FormType = {
	rows: { value: string };
	cols: { value: string };
}
type Props = {
	onInitialiseBoardHistory: (history: IBoardState[], size: IBoardSize) => void;
}
export const StartPage = ({ onInitialiseBoardHistory }: Props) => {
	const formData = useForm<FormType>({ resolver: yupResolver(schema) });
	const { handleSubmit, formState: { errors } } = formData;

	const onSubmit = ({ rows, cols }: FormType) => {
		onInitialiseBoardHistory([], { rows: Number(rows.value), cols: Number(cols.value) })
	};

	const onImportClick = () => {

	};

	return (
		<FormProvider {...formData}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='rows'
					render={() => (
						<TextField defaultValue={1} required error={!!errors.cols} />
					)}
				/>
				<Controller name='cols' render={() => <TextField defaultValue={1} required />} />
				<button>Confirm</button>
			</form>
			Alternatively
			<hr />
			<label onClick={onImportClick}>
				<input hidden type='file' accept='application/JSON' />
				import
			</label>
		</FormProvider>
	);
};
