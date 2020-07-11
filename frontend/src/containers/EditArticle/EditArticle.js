import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {editArticle, fetchArticle} from "../../store/actions/articlesActions";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormElement from "../../components/UI/Form/FormElement";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {fetchCategories} from "../../store/actions/categoriesActions";

const useStyles = makeStyles(() => ({
	grid: {
		margin: '0 auto',
	},
	formElement: {
		textAlign: 'center',
	},
	btn: {
		textAlign: 'center',
		marginTop: '8px'
	}
}));

const EditArticle = props => {
	const singleArticle = useSelector(state => state.articles.article);
	const categories = useSelector(state => state.categories.categories);
	const dispatch = useDispatch();
	const classes = useStyles();

	const [article, setArticle] = useState({
		category: '',
		title: '',
		description: '',
		image: '',
	});

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchArticle(props.match.params.id));
	}, [dispatch, props.match.params.id]);

	const inputChangeHandler = event => {
		setArticle({...article, [event.target.name]: event.target.value})
	};

	const fileChangeHandler = event => {
		setArticle({...article, image: event.target.files[0]})
	};

	const onSubmitHandler = event => {
		event.preventDefault();

		const data = new FormData();
		Object.keys(article).forEach(key => {
			let value = article[key];
			data.append(key, value)
		});

		dispatch(editArticle(props.match.params.id, data))
	};

	const categoriesOptions = categories && categories.map(c => ({title: c.title, id: c._id}));

	return (
		<>
			{singleArticle &&
			<Container justify="center">
				<form onSubmit={onSubmitHandler}>
					<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid}>
						<Grid item className={classes.formElement}>
							<FormElement
								type="select"
								propertyName="category" required
								title="Категория"
								onChange={inputChangeHandler}
								options={categoriesOptions}
								value={article.category}
							/>
						</Grid>
						<Grid item className={classes.formElement}>
							<FormElement
								id="title"
								required
								propertyName='title'
								value={article.title}
								title="Изменить название"
								onChange={inputChangeHandler}
							/>
						</Grid>
						<Grid item className={classes.formElement}>
							<FormElement
								id="description"
								required
								propertyName='description'
								value={article.description}
								title="Изменить описание"
								onChange={inputChangeHandler}
							/>
						</Grid>
						<Grid item className={classes.formElement}>
							<FormElement
								propertyName='image'
								title="Выбрать фото"
								onChange={fileChangeHandler}
								type='file'
							/>
						</Grid>
						<Grid item className={classes.btn}>
							<Box component="span">
								<Button
									variant='contained'
									color='primary'
									type='submit'
								>
									Изменить
								</Button>
							</Box>
						</Grid>
					</Grid>
				</form>
			</Container>
			}
		</>
	);
};

export default EditArticle;