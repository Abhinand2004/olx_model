import React, { useEffect, useState } from "react";
import "./details.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
const ProductDetails = () => {
    const  navigate=useNavigate()
    const {id}=useParams()
const [product,setProduct]=useState({
    productName: "",
    images: [],
    category: "",
    description: "",
    price: ""
})
//   console.log(id);
  
const fetchProductDetails=async()=>{
    try {
        const res= await axios.get(`http://localhost:3000/api/productdetails/${id}`)
        if (res.status===200) {
            setProduct(res.data.userdata)   
        }
        else(
            alert("error")
        )
    } catch (error) {
        alert(error)
    }
}
const deleteData=async()=>{
    try {
        const res=await axios.delete(`http://localhost:3000/api/deleteproduct/${id}`)
        if (res.status===200) {
            alert("suseesdully delete")
            navigate("/profile")
        }else{
            alert("error")
        }
    } catch (error) {
       alert(error) 
    }
}
useEffect(()=>{
    fetchProductDetails()
},[])
  return (
    <div className="product-details-container">
   
      <h1 className="product-name">{product.productName}</h1>

   
      <div className="images-container">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} className="product-image" />
        ))}
      </div>

    
      <div className="product-info">
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> {product.price}</p>
      </div>

     
      <div className="action-buttons">
        <Link to={`/edit/${id}`}>
        <button className="edit-button" >Edit</button>
        
        </Link>
        <button className="delete-button" onClick={deleteData}>Delete</button>
        <Link to={"/"}><button>Home</button></Link>
      </div>
    </div>
  );
};

export default ProductDetails;
