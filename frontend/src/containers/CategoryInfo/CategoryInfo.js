import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteCategory, fetchCategory} from "../../store/actions/categoriesActions";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Modal from "../../components/UI/Modal/Modal";
import {makeStyles} from "@material-ui/core/styles";

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
	}
});

const CategoryInfo = props => {
	const singleCategory = useSelector(state => state.categories.category);
	const user = useSelector(state => state.users.user);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		dispatch(fetchCategory(props.match.params.id));
	}, [dispatch, props.match.params.id]);

	const removeCategory = async () => {
		dispatch(deleteCategory(props.match.params.id));
	};

	return (
		<>
			{singleCategory &&
			<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid}>
				<Card className={classes.card}>
					<CardContent>
						<b>Название: </b>{singleCategory.title}
					</CardContent>
					{user && user.role === 'admin' &&
					<Grid item>
						<Button color="secondary" variant="outlined"
								className={classes.btn} onClick={handleClickOpen}>
							Удалить
						</Button>
					</Grid>
					}
				</Card>
				<Modal onClose={handleClose} open={open} title="Вы действительно хотите удалить эту категорию?">
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
								onClick={removeCategory}
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

export default CategoryInfo;