const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.settings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      siteName: 'ClothVex',
      tagline: 'Unstitched & Stitched Fabrics, Delivered.',
      logo: '',
      whatsapp: '923133925925',
      email: 'abdulsubhan567@gmail.com',
      address: 'Pakistan'
    }
  });

  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({
      data: [
        {
          name: 'Lawn 3-Piece Unstitched Suit',
          description: 'Premium printed lawn fabric, 3 piece (shirt, dupatta, trouser). Soft texture, perfect for summer.',
          category: 'unstitched',
          price: 3200,
          oldPrice: 3900,
          sizes: '',
          colors: 'Pink,Blue,Black',
          stock: 25,
          images: JSON.stringify([]),
          featured: true
        },
        {
          name: 'Embroidered Chiffon Stitched Dress',
          description: 'Fully stitched embroidered chiffon dress with delicate handwork, lined inner.',
          category: 'stitched',
          price: 7500,
          oldPrice: null,
          sizes: 'S,M,L,XL',
          colors: 'Maroon,Black',
          stock: 12,
          images: JSON.stringify([]),
          featured: true
        },
        {
          name: 'Khaddar Winter Unstitched 2-Piece',
          description: 'Warm khaddar fabric, 2 piece, ideal for winters.',
          category: 'unstitched',
          price: 2800,
          oldPrice: null,
          sizes: '',
          colors: 'Mustard,Green',
          stock: 18,
          images: JSON.stringify([]),
          featured: false
        }
      ]
    });
  }
}

main()
  .then(async () => {
    console.log('Seed complete.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
