import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { email } = await request.json();

        const user = await User.findOne({ email }).select('_id'); 

        console.log('user:', user);

        return NextResponse.json({
            exists: !!user 
        });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Error checking user" },
            { status: 500 }
        );
    }
}