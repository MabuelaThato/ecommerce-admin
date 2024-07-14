"use client"
import React, { useEffect, useState } from 'react'
import { TfiPencil } from "react-icons/tfi";
import { getProducts } from '@/actions/actions';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DeleteProduct from './deleteProduct';
import { QueryResultRow } from '@vercel/postgres';
import { Button } from './ui/button';

const ProductsTable = () => {
  const [products, setProducts] = useState<QueryResultRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        if (productsData) {
          setProducts(productsData);
        } else {
          console.error('Error fetching products: Data is undefined');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (<div className='flex justify-center gap-4 items-center h-screen'>
                <div className='green-loader'></div>
                <span className='text-gray-600 font-medium'>Loading</span>
            </div>);
  }

  return (
    <div className="border bg-white rounded-lg border-brown">
      <Table className='text-xs md:text-sm'>
        <TableHeader>
          <TableRow className='bg-brown hover:bg-brown'>
            <TableHead className='text-white'>Name</TableHead>
            <TableHead className='text-white'>Description</TableHead>
            <TableHead className='text-white'>Image</TableHead>
            <TableHead className='text-white'>Price</TableHead>
            <TableHead className='text-white'>Category</TableHead>
            <TableHead className='text-white'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{product?.name}</TableCell>
                <TableCell className='max-w-80'>{product?.description}</TableCell>
                <TableCell>{product?.image}</TableCell>
                <TableCell>R{product?.price}</TableCell>
                <TableCell>{product?.category}</TableCell>
                <TableCell className='flex items-center gap-2'>
                    <span className='hover:text-white hover:bg-gray-600 bg-white text-gray-600 border rounded-md border-gray-600 md:px-2 p-1'>
                        <TfiPencil />
                    </span>
                    <DeleteProduct productId={product?.productid}/>

                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductsTable;