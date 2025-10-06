import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";



export async function GET(req){

    const db = await getDatabase() ;
    const { searchParams } = new URL(req.url) ;
    const email = searchParams.get('email') ;
    const result = await db.collection('events').find({organizerEmail : email,approvalStatus: "approved"}).toArray() ;
export async function POST(request){

    const db = await getDatabase() ;
    const data = await request.json() ;
    const result = await db.collection('events').insertOne(data) ;
    return NextResponse.json(result) ;

}

export async function PUT(req){

    const db = await getDatabase() ;
    const { searchParams } = new URL(req.url) ;
    const id = searchParams.get('eventId') ;
    const data = await req.json() ;

    const result = await db.collection('events').updateOne(
        { eventId : id } ,
        { $set : data }
    ) ;
    return NextResponse.json(result) ;
    
}

export async function DELETE(req){

    const { searchParams } = new URL(req.url) ;
    const email = searchParams.get('email') ;
    const eventId = searchParams.get('eventId') ;
    const db = await getDatabase() ;
    const result = await db.collection('events').deleteOne({organizerEmail : email, _id : new ObjectId(eventId)}) ;
    return NextResponse.json(result) ;

}



// updating an event



//ticket stat aggregrate api 



