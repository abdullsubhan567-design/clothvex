import prisma from '../../../../../lib/prisma';
import AdminShell from '../../../../../components/AdminShell';
import ProductForm from '../../../../../components/ProductForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();

  return (
    <AdminShell>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Edit Product</h1>
      <ProductForm initial={product} productId={product.id} />
    </AdminShell>
  );
}
