'use server'
import { sql } from '@vercel/postgres';

export async function addProduct(image: string, form: any){
    try {
        await sql`INSERT INTO products (name, description, price, image, category) VALUES (${form.name}, ${form.description}, ${form.price}, ${image}, ${form.category});`
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts(){

    try {
       
        const { rows } = await sql`SELECT * from products;`;
        
        const products = rows;
    
        return products;
    } catch (error) {
        console.log(error);
    }

}

export async function deleteProduct(productId:string){

    try {
        await sql`DELETE FROM products WHERE productid = ${productId};`
    } catch (error) {
        console.log(error)
    }

  }