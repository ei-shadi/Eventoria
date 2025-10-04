import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {

    const db = await getDatabase() ; 
    const events = await db.collection('events').find({}).toArray() ;
    return NextResponse.json(events) ;
    
}

export async function POST(req) {

    const db = await getDatabase() ;
    const data = await req.json() ;
    const result = await db.collection('events').insertOne(data) ;
    return NextResponse.json(result) ;

}

// for updating event status (approve/reject)
export async function PUT(req) {

    const db = await getDatabase() ;
    const data = await req.json() ;
    const { id, status } = data ; 
    const result = await db.collection('events').updateOne({ _id: new ObjectId(id) }, { $set: { status: status } }) ;
    return NextResponse.json(result) ;

}

export async function DELETE(req) {

    const db = await getDatabase() ;
    const { searchParams } = new URL(req.url) ;
    const id = searchParams.get('id') ;
    const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) }) ;
    return NextResponse.json(result) ;

}