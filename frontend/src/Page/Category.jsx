import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import Api from "../Services/Api"
import { useWishlist } from "../context/WishlistContext";
import AOS from "aos";

export default function Category() {

    const { categoryvalue } = useParams()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("");
    const { wishlist, fetchWishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate()

    const apiCall = async () => {
        try {
            setLoading(true);
            const res = await Api.get("/products");
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }



    const handleid = ((id) => {
        navigate(`/Product?id=${id}`)
    })

    useEffect(() => {
        apiCall()
        window.scrollTo(0,0)
    }, [])

    useEffect(() => {
        if (products.length > 0) {
            setTimeout(() => AOS.refresh(), 100);
        }
    }, [products]);


    const filteredProducts = products.filter(p =>
        p.category?.includes(categoryvalue)
    );


    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case "low-high":
                return a.price - b.price;
            case "high-low":
                return b.price - a.price;
            case "a-z":
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            case "z-a":
                return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
            default:
                return 0;
        }
    });


    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="container-fluid">
            <div className="mt-5">
                <div className="row g-3">

                    <div className="d-flex justify-content-between align-items-center">
                        <h2>{categoryvalue}</h2>
                        <select className="form-select w-auto" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="">Sort By</option>
                            <option value="low-high">Price (Low &lt; High)</option>
                            <option value="high-low">Price (High &gt; Low)</option>
                            <option value="a-z">Name (A-Z)</option>
                            <option value="z-a">Name (Z-A)</option>
                        </select>
                    </div>

                    {sortedProducts.map((p, index) => (
                        <div key={p._id} className="col-6 col-md-4 col-lg-3" data-aos="fade-up" data-aos-delay={Math.min(index * 50, 300)} data-aos-duration="600" data-aos-offset="0">

                            <div className="position-relative">
                                <img src={`/upload/${p.images[0]}`} className="img-fluid" style={{ cursor: "pointer" }} alt="" onClick={() => handleid(p._id)} />

                                <h5 className="position-absolute top-0 end-0 p-2 py-1 mt-3 me-3 rounded-5" style={{ cursor: "pointer" }} onClick={() => toggleWishlist(p._id)}>
                                    <i className={wishlist.includes(p._id) ? "bi bi-heart-fill text-danger" : "bi bi-heart"}></i>
                                </h5>
                            </div>

                            <p className="mb-0 mt-1 product-name">{p.name}</p>
                            <span className="text-dark fw-bold mt-1 mb-1">
                                ₹ {p.price}
                            </span>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

