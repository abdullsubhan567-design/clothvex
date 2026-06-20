import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  let settings = await prisma.settings.findUnique({ where: { id: 'main' } });
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        id: 'main',
        siteName: 'ClothVex',
        tagline: 'Unstitched & Stitched Fabrics, Delivered.',
        logo: '',
        whatsapp: '923133925925',
        email: 'abdulsubhan567@gmail.com',
        address: 'Pakistan'
      }
    });
  }
  return NextResponse.json(settings);
}

export async function PUT(request) {
  const body = await request.json();

  const settings = await prisma.settings.upsert({
    where: { id: 'main' },
    update: {
      siteName: body.siteName,
      tagline: body.tagline,
      logo: body.logo,
      whatsapp: body.whatsapp,
      email: body.email,
      address: body.address
    },
    create: {
      id: 'main',
      siteName: body.siteName || 'ClothVex',
      tagline: body.tagline || '',
      logo: body.logo || '',
      whatsapp: body.whatsapp || '923133925925',
      email: body.email || 'abdulsubhan567@gmail.com',
      address: body.address || 'Pakistan'
    }
  });

  return NextResponse.json(settings);
}
