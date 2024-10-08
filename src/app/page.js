"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Bar from './nav/Barr';
export default function Store() {
    let [result, setResult] = useState([]);
    let [filteredProducts, setFilteredProducts] = useState([]);
    let [category, setCategory] = useState("all");
    let [rating, setRating] = useState(0);
    let [price, setPrice] = useState(100);
    let [cartItems, setCartItems] = useState([]);

    const getProducts = async () => {
        let data = await fetch('https://fakestoreapi.com/products');
        let save = await data.json();
        setResult(save);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let filtered = result.filter(item =>
            (category === "all" || item.category === category) &&
            item.rating.rate >= rating && item.price <= price
        );
        setFilteredProducts(filtered);
    };

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const clearCart = () => {
        setCartItems([]);
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">MyEcommerceProducts.com</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>                    
                </div>
            </nav>
            <div style={{ backgroundColor: "white", minHeight: "50vh" }}>
                <h1 className="bg-success text-center" style={{ color: "Red", minHeight: "8vh" }}>Buy Different Type of Products</h1>
                <hr />
                <Bar />
                <div className="container my-4">
                    <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                        <div className="mx-2">
                            <label>Category: </label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                                <option value="all">All</option>
                                <option value="men's clothing">Men's Clothing</option>
                                <option value="women's clothing">Women's Clothing</option>
                                <option value="jewelery">Jewelery</option>
                                <option value="electronics">Electronics</option>
                            </select>
                        </div>
                        <div className="mx-2">
                            <label>Rating: </label>
                            <input type="number" min="0" max="5" step="0.5" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control" />
                        </div>
                        <div className="mx-2">
                            <label>Max Price: </label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" />
                        </div>
                        <div className="mx-2 align-self-end">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(item => (
                                <div className="col-md-4 mb-4 d-flex justify-content-center" key={item.id}>
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={item.image} className="card-img-top" alt={item.title} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text">Price: ${item.price}</p>
                                            <p className="card-text">Rating: {item.rating.rate}</p>
                                            <p className="card-text">{item.description}</p>
                                            <button className="btn btn-success" onClick={() => addToCart(item)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h2 className="text-center">No Products Found</h2>
                        )}
                    </div>
                </div>
            </div>
            {cartItems.length > 0 && (
                <div className="container my-4">
                    <h2>Cart Products</h2>
                    <div className="row">
                        {cartItems.map((item, index) => (
                            <div className="col-md-4 mb-4 d-flex justify-content-center" key={index}>
                                <div className="card" style={{ width: "18rem" }}>
                                    <img src={item.image} className="card-img-top" alt={item.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">Price: ${item.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex mx-2">
                        <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={clearCart}>Clear Cart</button>
                    </div>

                </div>
            )}
            <footer className="bg-light text-center py-3 mt-4">
                <p>Website developed by Rana Haris &copy; 2024</p>
            </footer>
        </>
    );
}
