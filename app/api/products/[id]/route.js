import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request, { params }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  const body = await request.json();

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name: body.name,
      description: body.description || '',
      category: body.category,
      price: parseInt(body.price, 10) || 0,
      oldPrice: body.oldPrice ? parseInt(body.oldPrice, 10) : null,
      sizes: body.sizes || '',
      colors: body.colors || '',
      stock: parseInt(body.stock, 10) || 0,
      images: JSON.stringify(body.images || []),
      featured: !!body.featured
    }
  });

  return NextResponse.json(product);
}

export async function DELETE(request, { params }) {
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
