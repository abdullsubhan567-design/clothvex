const prisma = require('./prisma');

async function getSettings() {
  let settings = await prisma.settings.findUnique({ where: { id: 'main' } });
  if (!settings) {
    settings = {
      siteName: 'ClothVex',
      tagline: 'Unstitched & Stitched Fabrics, Delivered.',
      logo: '',
      whatsapp: '923133925925',
      email: 'abdulsubhan567@gmail.com',
      address: 'Pakistan'
    };
  }
  return settings;
}

module.exports = { getSettings };
