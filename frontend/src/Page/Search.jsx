import React, { useEffect } from 'react'
import Api from "../Services/Api"
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useWishlist } from "../context/WishlistContext";


export default function Search() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("query");
  const [products, setProducts] = useState([]);
  const { wishlist, fetchWishlist, toggleWishlist } = useWishlist();

  const navigate = useNavigate();

  const handleid = ((id) => {
    navigate(`/Product?id=${id}`)
  })



  useEffect(() => {
    result()
  }, [search])

  const result = async () => {

    const res = await Api.get(`search?query=${search}`)
    setProducts(res.data)
  }
  return (
    <div className="container mt-4">
      <h4>Search Results for: {search}</h4>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <>
          <div className="container-fluid">
            <div className="row g-3">{
              products.map((item) => (
                <div key={item._id} className="col-6 col-md-4 col-lg-3">

                  <div className="position-relative">
                    <img src={`upload/${item.images[0]}`} className="img-fluid" style={{ cursor: "pointer" }} alt="" onClick={() => handleid(item._id)} />
                    <h5 className="p  osition-absolute top-0 end-0 p-2 py-1 mt-3 me-3 rounded-5" style={{ cursor: "pointer" }} onClick={() => toggleWishlist(item._id)}>
                      <i className={wishlist.includes(item._id) ? "bi bi-heart-fill text-danger" : "bi bi-heart"}></i>
                    </h5>
                  </div>

                  <p className="mb-0 mt-1">{item.name}</p>
                  <span className="text-dark fw-bold mt-1 mb-1">₹ {item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
