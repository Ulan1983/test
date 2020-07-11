import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editCategory} from "../../store/actions/categoriesActions";
import Grid from "@material-ui/core/Grid";
import FormElement from "../../components/UI/Form/FormElement";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
	},
	typography: {
		textAlign: 'center',
		marginBottom: '1%'
	}
}));

const EditCategory = props => {
	const singleCategory = useSelector(state => state.categories.category);
	const dispatch = useDispatch();
	const classes = useStyles();

	const [category, setCategory] = useState({
		title: ''
	});

	const inputChangeHandler = event => setCategory({...category, [event.target.name]: event.target.value});

	const onSubmitHandler = event => {
		event.preventDefault();

		dispatch(editCategory(props.match.params.id, category));
	};

	return (
		<>
			{singleCategory &&
			<Container justify="center">
				<form onSubmit={onSubmitHandler}>
					<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid}>
						<Typography variant="h4" className={classes.typography}>
							Редактирование
						</Typography>
						<Grid item className={classes.formElement}>
							<FormElement
								id="title"
								required
								propertyName='title'
								value={category.title}
								title="Изменить название"
								onChange={inputChangeHandler}
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

export default EditCategory;