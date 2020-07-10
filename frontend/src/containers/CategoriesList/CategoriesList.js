import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
	main: {
		marginTop: '2%',
		marginBottom: '2%'
	},
	grid: {
		margin: '0 auto',
		padding: '10px'
	},
	root: {
		minWidth: 275,
	},
});

const CategoriesList = () => {
	const categories = useSelector(state => state.categories.categories);
	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<Grid container direction="column" spacing={2} className={classes.main}>
			<Button color="primary" component={NavLink} to="/category/new">
				Добавить категорию
			</Button>
			<Grid container>
				{categories && categories.map(category => (
					<Grid item xs={12} sm={6} md={4} className={classes.grid} key={category._id} >
						<Card className={classes.root}>
							<CardContent>
								<Typography color="textSecondary" gutterBottom>
									<b>Название: </b>{category.title}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small"
										component={NavLink} to={`/category/${category._id}`}
										color="primary"
										variant="contained"
								>
									Просмотр
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))
				}
			</Grid>

		</Grid>

	);
};

export default CategoriesList;