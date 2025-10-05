
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    
    const db = await getDatabase() ;
    const result = await db.collection('Organizer').find({}).toArray() ;
    return NextResponse.json(result) ;
    
}

// approving an organizer
export async function PUT(req){

    const db = await getDatabase() ;
    const data = await req.json() ;
    const { id, status } = data ; 
    const result = await db.collection('Organizer').updateOne({ _id: new ObjectId(id) }, { $set: { status: status } }) ;
    return NextResponse.json(result) ;

}

export async function DELETE(req){

    const db = await getDatabase() ;
    const { searchParams } = new URL(req.url) ;
    const id = searchParams.get('id') ;
    const result = await db.collection('Organizer').deleteOne({ _id: new ObjectId(id) }) ;
    return NextResponse.json(result) ;

}