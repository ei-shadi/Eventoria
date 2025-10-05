import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(){

    const db = await getDatabase() ;
    const result = await db.collection('events').find({}).toArray() ;
    return NextResponse.json(result) ;

}

export async function POST(request){

    const db = await getDatabase() ;
    const data = await request.json() ;
    const result = await db.collection('events').insertOne(data) ;
    return NextResponse.json(result) ;

}

export async function DELETE(req){

    const { searchParams } = new URL(req.url) ;
    const email = searchParams.get('email') ;

    const db = await getDatabase() ;
    const result = await db.collection('events').deleteOne({organizerEmail : email}) ;
    return NextResponse.json(result) ;

}