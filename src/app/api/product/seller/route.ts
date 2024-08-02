import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectMongoDB();
        const topSellingProducts = await Product.find()
            .sort({ quantitySold: -1 })
            .limit(8);

        return NextResponse.json({ products: topSellingProducts });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}






