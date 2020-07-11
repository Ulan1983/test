import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {deleteArticle, fetchArticle} from "../../store/actions/articlesActions";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import Modal from "../../components/UI/Modal/Modal";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
	grid: {
		margin: '0 auto'
	},
	root: {
		minWidth: 275,
	},
	card: {
		textAlign: 'center'
	},
	btn: {
		marginBottom: '2%'
	},
	media: {
		height: 200,
		marginBottom: '1%'
	},
});

const ArticleInfo = props => {
	const singleArticle = useSelector(state => state.articles.article);
	const user = useSelector(state => state.users.user);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		dispatch(fetchArticle(props.match.params.id));
	}, [dispatch, props.match.params.id]);

	const removeArticle = async () => {
		dispatch(deleteArticle(props.match.params.id));
	};

	return (
		<>
			{singleArticle &&
			<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid}>
				<Card className={classes.card}>
					<CardContent>
						<CardMedia
							className={classes.media}
							image={singleArticle.image ?
								`http://localhost:8000/uploads/articleImage/${singleArticle.image}` &&
								`http://localhost:8000/uploads/fixtures/${singleArticle.image}`
								: ''}
							title={singleArticle.title}
						/>
						<Typography variant="h6"><b>Название: </b>{singleArticle.title}</Typography>
						<Typography variant="h6"><b>Описание: </b>{singleArticle.description}</Typography>
						<Typography variant="h6"><b>Категория: </b>{singleArticle.category.title}</Typography>
						<Typography variant="h6"><b>Кто добавил статью: </b>{singleArticle.user.username}</Typography>
					</CardContent>
					<Grid item>
						<Button color="inherit" variant="outlined"
								className={classes.btn} component={NavLink} to={`/article/edit/${singleArticle._id}`}>
							Редактировать
						</Button>
					</Grid>
					{user && user.role === 'admin' &&
					<Grid item>
						<Button color="secondary" variant="outlined"
								className={classes.btn} onClick={handleClickOpen}>
							Удалить
						</Button>
					</Grid>
					}
				</Card>
				<Modal onClose={handleClose} open={open} title="Вы действительно хотите удалить эту статью?">
					<Grid container justify='center' spacing={1}>
						<Grid item>
							<Button
								variant="contained"
								color="primary"
								onClick={handleClose}
							>Нет</Button>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="secondary"
								onClick={removeArticle}
								id='yes'
							>Да</Button>
						</Grid>
					</Grid>
				</Modal>
			</Grid>
			}
		</>
	);
};

export default ArticleInfo;