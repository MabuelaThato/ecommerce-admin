"use client"
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa6';
import { deleteProduct } from '@/actions/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const DeleteProduct = ({productId} : {productId: string}) => {

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      setDeleting(true)
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
      <AlertDialog>
      <AlertDialogTrigger
      className='hover:text-white hover:bg-goldish bg-white text-goldish border rounded-md border-goldish md:px-2 p-1'>
        {
          deleting ? (<div>...</div>) : (<FaTrash />)
        }
      </AlertDialogTrigger>
      <AlertDialogContent className='max-w-[350px] md:max-w-[425px] rounded'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your class
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
          onClick={handleDelete}
          disabled={deleting}
          >
          Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    
  );
};

export default DeleteProduct;