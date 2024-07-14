import AddProduct from '@/components/addProduct';
import ProductsTable from '@/components/productsTable';
import React from 'react';

const Products = () => {
  return (
    <div className='flex flex-col gap-4 lg:gap-6'>
        <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-medium'>Products</h1>
            <AddProduct />
        </div>
        <ProductsTable />
    </div>
  )
}

export default Products