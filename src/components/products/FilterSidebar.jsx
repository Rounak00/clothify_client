import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 10000,
    })
    const [priceRange, setPriceRange] = useState([0, 10000]);

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFilters((prevFilters) => {
            let newFilter = { ...prevFilters };

            if (type === "checkbox") {
                if (checked) {
                    newFilter[name] = [...(newFilter[name] || []), value];
                } else {
                    newFilter[name] = newFilter[name].filter((item) => item !== value);
                }
            } else {
                newFilter[name] = value;
            }
            
            updateURLParams(newFilter);
            // console.log(newFilter); // Logs the updated state
            return newFilter;
        });
        
        
    };

    const updateURLParams=(newFilters)=>{
        const params=new URLSearchParams();
        
        Object.keys(newFilters).forEach((key)=>{
            if(Array.isArray(newFilters[key])&& newFilters[key].length >0){
                params.append(key,newFilters[key].join(","));
            }else if(newFilters[key]){
                params.append(key,newFilters[key]);
            }
        });
        setSearchParams(params);
        navigate(`?${params.toString()}`);
    }

    const categories = ["Top Wear", "Bottom Wear"];
    const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"];
    const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];
    const genders = ["Men", "Women"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 10000,
        })
        setPriceRange([0, params.maxPrice || 10000]);
    }, [searchParams])

    const handlePriceChange=(e)=>{
        const newPrice=e.target.value;
        setPriceRange([0,newPrice]);
        const newFilters={...filters,minPrice:0,maxPrice:newPrice};
        setFilters(filters)
        updateURLParams(newFilters)
    }
    return (
        <div className="p-4">
            <h3 className="font-medium text-xl text-gray-800 mb-4">Filter</h3>
            <div className='mb-6'>
                <label className='block text-gray-600 mb-2 font-medium'>Category</label>
                {categories.map((category) => (
                    <div key={category} className='flex items-center mb-1'>
                        <input type="radio" checked={filters.category===category} value={category} onChange={handleFilterChange} name="category" className='mr-2 h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300' />
                        <span className='text-gray-700'>{category}</span>
                    </div>
                ))}
            </div>

            <div className='mb-6'>
                <label className='block text-gray-600 mb-2 font-medium'>Gender</label>
                {genders.map((gender) => (
                    <div key={gender} className='flex items-center mb-1'>
                        <input checked={filters.gender===gender} value={gender} onChange={handleFilterChange} type="radio" name="gender" className='mr-2 h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300' />
                        <span className='text-gray-700'>{gender}</span>
                    </div>
                ))}
            </div>

            <div className='mb-6'>
                <label className='block text-gray-600 mb-2 font-medium'>Color</label>
                <div className='flex flex-wrap gap-2'>
                    {colors.map((color) => (
                        <button key={color}
                            name="color"
                            value={color}
                            onClick={handleFilterChange}
                            className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color===color ? "ring-2 ring-blue-500":""}`}
                            style={{ backgroundColor: color.toLowerCase() }}>
                        </button>
                    ))}
                </div>
            </div>

            <div className='mb-6'>
                <label className='block text-gray-600 mb-2 font-medium'>Size</label>
                {sizes.map((size)=>(
                    <div key={size} className='flex items-center mb-1'>
                     <input value={size}  checked={filters.size.includes(size)} onChange={handleFilterChange} type="checkbox" name="size" className='mr-2 h-4 w-4 text-red-500 focus:ring-red-400 border-gray-500
                     ' />  
                        <span className='text-gray-700'>{size}</span>  
                    </div>
                ))}
            </div>


            <div className='mb-6'>
                <label className='block text-gray-600 mb-2 font-medium'>Material</label>
                {materials.map((material) => (
                    <div key={material} className='flex items-center mb-1'>
                        <input type="checkbox" checked={filters.material.includes(material)} value={material} onChange={handleFilterChange} name="material" className='mr-2 h-4 w-4 text-red-500 focus:ring-red-400 border-gray-500
                     ' />
                        <span className='text-gray-700'>{material}</span>
                    </div>
                ))}
            </div>


            <div className='mb-6'>
                <label className='block text-gray-600 mb-2 font-medium'>Brand</label>
                {brands.map((brand) => (
                    <div key={brand} className='flex items-center mb-1'>
                        <input type="checkbox" checked={filters.brand.includes(brand)} onChange={handleFilterChange} value={brand} name="brand" className='mr-2 h-4 w-4 text-red-500 focus:ring-red-400 border-gray-500
                     ' />
                        <span className='text-gray-700'>{brand}</span>
                    </div>
                ))}
            </div>

            <div className='mb-8'>
                <label className="block text-gray-600 font-medium mb-2">
                    Price Range
                </label>
                <input type="range" value={priceRange[1]} onChange={handlePriceChange} name="priceRange" min={0} max={10000} className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer' />
                <div className='flex justify-between text-gray-600 mt-2'>
                    <span>₹0</span><span>₹{priceRange[1]}</span>
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar