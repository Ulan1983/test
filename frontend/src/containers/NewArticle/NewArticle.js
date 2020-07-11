import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {createArticle} from "../../store/actions/articlesActions";
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

const NewArticle = () => {
	const [state, setState] = useState({
		category: '',
		title: '',
		description: '',
		image: '',
	});

	const dispatch = useDispatch();
	const categories = useSelector(state => state.categories.categories);
	const classes = useStyles();
	const error = useSelector(state => state.articles.error);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const inputChangeHandler = event => setState({...state, [event.target.name]: event.target.value});

	const fileChangeHandler = event => setState({...state, image: event.target.files[0]});

	const onSubmitHandler = event => {
		event.preventDefault();

		const data = new FormData();

		Object.keys(state).forEach(key => {
			let value = state[key];
			data.append(key, value)
		});

		dispatch(createArticle(data));
	};
	const categoriesOptions = categories && categories.map(c => ({title: c.title, id: c._id}));

	return (
		<>
			<Container justify="center">
				<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid} >
					<Box component="div" p={2}>
						<Typography variant="h5" className={classes.typography}>
							Добавление статьи
						</Typography>
						<form onSubmit={onSubmitHandler}>
							<Grid className={classes.gridFormElement}>
								<FormElement
									type="select"
									propertyName="category" required
									title="Категория"
									onChange={inputChangeHandler}
									options={categoriesOptions}
									value={state.category}
								/>
							</Grid>
							<Grid className={classes.gridFormElement}>
								<FormElement
									required
									propertyName="title"
									title="Название"
									value={state.title}
									onChange={inputChangeHandler}
									type="text"
									autoComplete="current-title"
									placeholder="Введите название статьи"
								/>
							</Grid>
							<Grid className={classes.gridFormElement}>
								<FormElement
									required
									propertyName="description"
									title="Описание"
									value={state.description}
									onChange={inputChangeHandler}
									type="text"
									autoComplete="current-description"
									placeholder="Введите описание статьи"
								/>
							</Grid>
							<Grid item className={classes.gridFormElement}>
								<FormElement
									propertyName='image'
									title="Выбрать фото"
									onChange={fileChangeHandler}
									type='file'
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

export default NewArticle;