import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";


export default function ProductCard(props) {
	return (
		<Grid item xs={12} md={6} lg={4}>
			<Card>
			<CardMedia
				component="img"
				height="500"
				image={props.image_url}
				alt={props.title}
			/>
			<CardContent>
				<Typography gutterBottom variant="body1">
					{props.title}
				</Typography>
				<Typography gutterBottom variant="body1" align="center">
					{props.price} DOGE Coins
				</Typography>
			</CardContent>
			</Card>
        </Grid>
	);
}