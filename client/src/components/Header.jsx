import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
		  backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
		  marginLeft: theme.spacing(3),
		  width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  toolbar: theme.mixins.toolbar
}));

export default function Header({setProducts}) {
	const classes = useStyles();
	const [searchTerm, setSearchTerm] = useState('');
	const handleChange = event => {
		setSearchTerm(event.target.value);
	}
	const handleSearch = event => {
		axios
			.get('/api/v1/listing', {
			params: {
				search: searchTerm,
			}
		})
			.then((response) => {
				const { data } = response.data;
				setProducts(data);
			})
			.catch((error) => {
				console.error(error);
			})
	}
	return (
		<div>
			<AppBar elevation={0}>
				<Toolbar>
					<Typography className={classes.title}>
						Etsy x DOGE
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search in any language"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
							value={searchTerm}
							onChange={handleChange}
						/>
					</div>
					<div>
						<button onClick={handleSearch}>
							Search
						</button>
					</div>
				</Toolbar>
			</AppBar>
			<div className={classes.toolbar}></div>
			<div className={classes.toolbar}></div>
		</div>
	);
}