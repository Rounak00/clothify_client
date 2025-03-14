import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from "react-icons/fa";
import FilterSidebar from '../components/products/FilterSidebar';
import SortOptions from '../components/products/SortOptions';
import ProductGrid from '../components/products/ProductGrid';

const Collection = () => {
    const sideBarRef=useRef(null);
    const [isSideBarOpen,setIsSideBarOpen]=useState(false);
    const [products,setProducts]=useState([]);
    const toggleSideBar=()=>{
        setIsSideBarOpen(!isSideBarOpen);
    }
    const handleClickOutSide=(e)=>{
        if(sideBarRef.current && !sideBarRef.current.contains(e.target)){
           setIsSideBarOpen(false);   
        }
    }
    useEffect(()=>{
        document.addEventListener("mousedown",handleClickOutSide)
        return ()=>{ 
        document.removeEventListener("mousedown", handleClickOutSide)
        }
    },[])
    useEffect(()=>{
        setTimeout(() => {
            const fetchProducts = [
                {
                    _id: 1,
                    name: "product 1",
                    price: 1000,
                    images: [{ url: "https://picsum.photos/500/500?random=1" }]
                }, {
                    _id: 2,
                    name: "product name 2",
                    price: 1000,
                    images: [{ url: "https://picsum.photos/500/500?random=2" }]
                },
                {
                    _id: 3,
                    name: "product name 3",
                    price: 1000,
                    images: [{ url: "https://picsum.photos/500/500?random=3" }]
                },
                {
                    _id: 4,
                    name: "product name 4",
                    price: 1000,
                    images: [{ url: "https://picsum.photos/500/500?random=4" }]
                },
                {
                    _id: 1,
                    name: "product 1",
                    price: 1000,
                    images: [{ url: "https://picsum.photos/500/500?random=1" }]
                }, {
                    _id: 2,
                    name: "product name 2",
                    price: 1000,
                    images: [{ url: "https://picsum.photos/500/500?random=2" }]
                },
                {
                    _id: 3,
                    name: "product name 3",
                    price: 1000,
                    images: [{ url: "https://picsum.photos/500/500?random=3" }]
                },
                {
                    _id: 4,
                    name: "product name 4",
                    price: 1000,
                    images: [{ url: "https://picsum.photos/500/500?random=4" }]
                }
            ]
            setProducts(fetchProducts);
        }, 1000);
    },[])
  return (
    <div className='flex flex-col lg:flex-row'>
        <button onClick={toggleSideBar} className='lg:hidden border p-2 flex justify-center items-center'>
            <FaFilter className='mr-2'/> Filters
        </button>
        {/* Filtersidebar  */}
        <div ref={sideBarRef} className={`${isSideBarOpen ?"translate-x-0":"-translate-x-full" } fixed inset-y-0 z-50 w-64 left-0 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FilterSidebar/>
        </div>
        <div className='flex-grow p-4 '>
            <h2 className="text-2xl uppercase mb-4">
                All Collections
            </h2>
            <SortOptions/>
            <ProductGrid product={products}/>
        </div>
    </div>
  )
}

export default Collection