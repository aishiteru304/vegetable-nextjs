"use client"

import React, { useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { deleteCartItem, getItemsFromCart } from './api'
import { AiFillDelete } from "react-icons/ai";
import { useToast } from '@/components/ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateCart } from '@/store/features/cartSlice';

const CartPage = () => {
    const { toast } = useToast()
    const cartItems = useSelector((state: RootState) => state.cart.amount)
    const dispath = useDispatch()

    const [datas, setDatas] = useState([])
    const fetchData = async () => {
        const data = await getItemsFromCart()
        setDatas(data.cartItems)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = async (id: string) => {
        const deleteResponse = await deleteCartItem(id)
        if (deleteResponse) {
            toast({
                description: deleteResponse.message,
                className: "text-primary1"
            })
            dispath(updateCart(cartItems - 1))
            setDatas((prevArray) => prevArray.filter((item: any) => item._id !== id));
        }
    }
    return (
        <div className="my-10">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Product Name</TableHead>
                        <TableHead className="md:block hidden">Image</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {datas && datas.length > 0 && datas.map((data: any) => (
                        <TableRow key={data._id}>
                            <TableCell className="font-medium capitalize">{data.productId.name}</TableCell>
                            <TableCell className="font-medium md:block hidden">
                                <img src={data.productId.image} alt="product" className="h-20 w-auto" />
                            </TableCell>
                            <TableCell className="font-medium">{data.productId.price}</TableCell>
                            <TableCell className="text-red-700 text-2xl relative">
                                <AiFillDelete className="absolute right-3 top-1/2 translate-y-[-50%]" onClick={() => handleDelete(data._id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CartPage