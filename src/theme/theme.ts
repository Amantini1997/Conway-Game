import { createTheme } from '@mui/material';

export const theme = createTheme({
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiInput: {
			defaultProps: {
				disableUnderline: true,
			},
			styleOverrides: {
				root: {
					input: {
						padding: '0px 14px',
					},
				},
			},
		},
	},
});