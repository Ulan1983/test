import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchArticles} from "../../store/actions/articlesActions";
import {fetchCategories} from "../../store/actions/categoriesActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import {NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
	grid: {
		margin: '0 auto',
		padding: '10px'
	},
	root: {
		minWidth: 275,
	},
	media: {
		height: 200,
	},
	gridBtn: {
		textAlign: 'center'
	}
});

const MainPage = props => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const dispatch = useDispatch();
	const articles = useSelector(state => state.articles.articles);
	const categories = useSelector(state => state.categories.categories);
	const classes = useStyles();

	useEffect(() => {
		dispatch(fetchArticles(props.match.params.id));
		dispatch(fetchCategories());
	}, [dispatch, props.match.params.id]);


	return (
		<>
			<Typography variant='h4'>Выбрать категорию</Typography>
			<IconButton onClick={handleClick}><MenuIcon/></IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<List component="nav" aria-label="main mailbox folders" style={{padding: '0'}}>
					<div>
						<ListItem onClick={handleClose} component={NavLink} to={'/'}
								  style={{fontSize: 'bold'}} button>
							Все
						</ListItem>
						<Divider/>
					</div>
					{categories && categories.map((elem, idx) => (
						<div key={idx}>
							<ListItem onClick={handleClose} component={NavLink} to={`/categoryTitle/${elem._id}`}
									  button>
								{elem.title}
							</ListItem>
						</div>
					))}
				</List>
			</Menu>
			<Grid item className={classes.gridBtn}>
				<Button color="primary" component={NavLink} to="/article/new">
					Добавить статью
				</Button>
			</Grid>
			<Grid container direction="column" spacing={2}>
				<Grid container>
					{articles && articles.map(article => (
						<Grid item xs={12} sm={6} md={4} className={classes.grid} key={article._id} >
							<Card className={classes.root}>
								<CardContent>
									<CardMedia
										className={classes.media}
										image={article.image ? `http://localhost:8000/uploads/articleImage/${article.image}` : ''}
										title={article.title}
									/>
									<Typography color="textSecondary" gutterBottom>
										<b>Название: </b>{article.title}
									</Typography>
									<Typography color="textSecondary" gutterBottom>
										<b>Описание: </b>{article.description}
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small"
											component={NavLink} to={`/article/${article._id}`}
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
		</>
	);
};

export default MainPage;