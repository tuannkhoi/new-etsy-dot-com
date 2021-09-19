import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import Header from './components/Header';
import ProductCard from './components/ProductCard'
import './App.css';

export default function App() {
    const [products, setProducts] = useState([]);

    return (
        <div>
            <Header setProducts={setProducts}/>
            <Grid container spacing={2}>
                {products.map(product => <ProductCard {...product}/>)}
		    </Grid>
        </div>
    );
}