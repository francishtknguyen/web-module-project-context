import React, { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

import { ProductContext } from './contexts/ProductContext'
import { CartContext } from './contexts/CartContext'
// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const localCart = useRef([]);
	const addItem = item => {
		console.log(item)
		if(cart.find((i)=> i ===item)){ 
			return
		}
		// add the given item to the cart
		setCart([
			...cart,
			item
		])
		localCart.current.push(item)
	};

	const removeItem = id => {
		setCart(cart.filter(item => item.id !== id))
	}

	useEffect(()=> {
		if(localCart.current.length)
			localStorage.setItem('cart', JSON.stringify(localCart.current))
	}, [cart, localCart])

	useEffect(()=>{
		if(localStorage.getItem('cart'))
			setCart(JSON.parse(localStorage.getItem('cart')));
	}, [])

	return (
		<ProductContext.Provider value={{products, addItem}}>
		<CartContext.Provider value = {{cart,removeItem}}>
			<div className="App">
				<Navigation />

				{/* Routes */}
				<Route exact path="/">
					<Products />
				</Route>

				<Route path="/cart">
					<ShoppingCart />
				</Route>
			</div>
		</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
