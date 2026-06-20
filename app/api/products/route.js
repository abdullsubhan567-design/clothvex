import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  const where = {};
  if (category) where.category = category;
  if (featured === 'true') where.featured = true;

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(products);
}

export async function POST(request) {
  const body = await request.json();

  const product = await prisma.product.create({
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

  return NextResponse.json(product, { status: 201 });
}
