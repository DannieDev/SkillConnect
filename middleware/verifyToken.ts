import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
    req.headers.set('x-user-id', (decoded as any).id);
    req.headers.set('x-user-type', (decoded as any).tipo);
    return NextResponse.next({ request: req });
  } catch (err) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 403 });
  }
}

export const config = {
  matcher: [
    '/app/cliente/home/:path*',
    '/app/dashboard/:path*',
    '/app/trabajador/:path*'
  ],
};
