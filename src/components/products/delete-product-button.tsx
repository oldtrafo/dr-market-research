"use client";

import { useState } from "react";
import { deleteProduct } from "@/lib/actions/products";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Trash2 } from "lucide-react";

export function DeleteProductButton({
  companyId,
  productId,
  productName,
}: {
  companyId: string;
  productId: string;
  productName: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    const result = await deleteProduct(companyId, productId);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <>
      <Button variant="danger" size="sm" onClick={() => setOpen(true)}>
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete product"
        actions={
          <>
            {error && <p className="mr-auto text-sm text-red-600">{error}</p>}
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" loading={loading} onClick={handleDelete}>Delete</Button>
          </>
        }
      >
        <p>
          Are you sure you want to delete <strong>{productName}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </>
  );
}
