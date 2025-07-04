import connectDB from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// GET Todos los clientes
export async function GET() {
  const db = await connectDB();
  const clientes = await db.collection('clientes').find().toArray();
  return NextResponse.json(clientes);
}

// POST Nuevo cliente
export async function POST(request: Request) {
  const data = await request.json();
  const db = await connectDB();
  
  try {
    const result = await db.collection('clientes').insertOne(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear cliente" },
      { status: 500 }
    );
  }
}

// PUT Actualizar cliente
export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const db = await connectDB();
  
  const result = await db.collection('clientes').updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  
  return NextResponse.json(result);
}

// DELETE Eliminar cliente
export async function DELETE(request: Request) {
  const { id } = await request.json();
  const db = await connectDB();
  
  const result = await db.collection('clientes').deleteOne(
    { _id: new ObjectId(id) }
  );
  
  return NextResponse.json(result);
}