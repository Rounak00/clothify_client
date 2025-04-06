import React, { useEffect, useRef, useState } from 'react'
import {FaFilter, FaObjectUngroup} from "react-icons/fa";
import FilterSidebar from '../components/products/FilterSidebar';
import SortOptions from '../components/products/SortOptions';
import ProductGrid from '../components/products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productSlice';

const Collection = () => {
    const {collection} = useParams();
    const [searchParams] = useSearchParams();
    const dispatch=useDispatch();
    const {products,loading,error}=useSelector((state)=>state.products);
    const queryParams=Object.fromEntries([...searchParams]);
    const sideBarRef=useRef(null);
    const [isSideBarOpen,setIsSideBarOpen]=useState(false);
    // const [products,setProducts]=useState([]);
    useEffect(()=>{
        dispatch(fetchProductsByFilters({collection,...queryParams}));
     },[dispatch,collection,searchParams])
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
            <ProductGrid product={products} loading={loading} error={error}/>
        </div>
    </div>
  )
}

export default Collection