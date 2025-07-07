import { NextResponse } from 'next/server';
import { crearTrabajador, obtenerTodosTrabajadores } from '@/services/trabajadorService';

export async function GET() {
  try {
    const lista = await obtenerTodosTrabajadores();
    return NextResponse.json(lista);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener trabajadores' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const nuevo = await crearTrabajador(data);
    return NextResponse.json(nuevo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear trabajador' }, { status: 500 });
  }
}
