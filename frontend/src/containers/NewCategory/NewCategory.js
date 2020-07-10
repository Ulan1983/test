import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createCategory} from "../../store/actions/categoriesActions";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert/Alert";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
	grid: {
		margin: '0 auto',
	},
	gridFormElement: {
		textAlign: 'center'
	},
	typography: {
		textAlign: 'center',
		marginBottom: '2%'
	},
	gridBtn: {
		textAlign: 'center',
		marginTop: '2%'
	},
	box: {
		width: '60%',
		margin: '2% auto'
	},
	btn: {
		width: '30%'
	}
});

const NewCategory = () => {
	const [state, setState] = useState({
		title: '',
	});

	const dispatch = useDispatch();
	const error = useSelector(state => state.categories.error);
	const classes = useStyles();

	const inputChangeHandler = event => setState({...state, [event.target.name]: event.target.value});

	const submitFormHandler = event => {
		event.preventDefault();

		dispatch(createCategory(state));
	};

	return (
		<>
			<Container justify="center">
				<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid} >
					<Box component="div" p={2}>
						<Typography variant="h5" className={classes.typography}>
							Добавление категории
						</Typography>
						<form onSubmit={submitFormHandler}>
							<Grid className={classes.gridFormElement}>
								<FormElement
									required
									propertyName="title"
									title="Название"
									value={state.title}
									onChange={inputChangeHandler}
									type="text"
									autoComplete="current-title"
									placeholder="Введите название категории"
								/>
							</Grid>
							<Grid className={classes.gridBtn}>
								<Button variant="contained" color="primary"
										type="submit" className={classes.btn}>
									Создать
								</Button>
							</Grid>
						</form>
						<Box className={classes.box}>
							{error && (
								<Alert severity="error">{error.error}</Alert>
							)}
						</Box>
					</Box>
				</Grid>
			</Container>
		</>
	);
};

export default NewCategory;