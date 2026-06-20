import AdminShell from '../../../../components/AdminShell';
import ProductForm from '../../../../components/ProductForm';

export default function NewProductPage() {
  return (
    <AdminShell>
      <h1 style={{ fontSize: 30, marginBottom: 24 }}>Add New Product</h1>
      <ProductForm />
    </AdminShell>
  );
}
