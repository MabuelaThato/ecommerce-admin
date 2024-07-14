"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '@/components/provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { addProduct } from '@/actions/actions';
 
const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(2),
  price: z.string(),
  category: z
  .string({
    required_error: "Please select a category.",
  })
})


const AddProduct = () => {

    const [image, setImage] = useState<File | null>(null);
    const [downloadUrl, setDownloadUrl] = useState("");
    const [uploading, setUploading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: "",
          price: "",
          category: "",
        },
      })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!image) {
        throw new Error('Please select an image.');
      }
  
      const fileRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(fileRef, image);
  
      const uploadPromise = new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log("ERROR UPLOADING FILE: ", error);
            reject(new Error('Image upload failed. Please try again.'));
          },
          async () => {
            try {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              setDownloadUrl(downloadUrl);
              console.log("File available at", downloadUrl);
              resolve();
            } catch (error) {
              reject(new Error('Failed to get download URL. Please try again.'));
            }
          }
        );
      });
  
      setUploading(true);
      await uploadPromise;
      await addProduct(image.name, values);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Image upload failed. Please try again.');
    }
  };


  return (
    <Dialog>
    <DialogTrigger asChild className='text-xs md:text-sm hover:cursor-pointer p-1 px-4 font-medium text-white rounded-md bg-goldish border border-goldish hover:text-goldish hover:bg-white'>
        <span>Add Product</span>
    </DialogTrigger>
    <DialogContent className="max-w-[350px] md:max-w-[425px] rounded"> 
      <DialogHeader>
        <DialogTitle>Add a new product</DialogTitle>
        <DialogDescription className='text-gray-600'>
          Enter all the information about the product.
        </DialogDescription>
    </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name of product" {...field} className='placeholder:text-gray-600'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description of product" {...field} className='placeholder:text-gray-600'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="serums">Oils and Serums</SelectItem>
                  <SelectItem value="conditioners">Conditioners</SelectItem>
                  <SelectItem value="shampoos">Shampoos</SelectItem>
                  <SelectItem value="moisturizers">Moisturizers</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 75" {...field} className='placeholder:text-gray-600' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col gap-2'>
           <div className='flex flex-col gap-1'>
            <Label>Image</Label>
            <span className='text-gray-600 text-xs'>Name of image must be the name of the product. E.g. 'HydroPro-Moisturizer.jpg'.</span>
           </div>
            <Input type="file" accept="image/*" id="image" onChange={handleFileChange} className="mt-2 hover:cursor-pointer" />

        </div>
        <Button 
        type="submit"
        disabled={uploading}
        className='w-full text-white rounded-md bg-brown border border-brown hover:text-brown hover:bg-white'
        >
            {
                uploading ? (<div>Adding...</div>) : (<div>Add Product</div>)
            }
        </Button>
      </form>
    </Form>
    </DialogContent>
  </Dialog>
  )
}

export default AddProduct