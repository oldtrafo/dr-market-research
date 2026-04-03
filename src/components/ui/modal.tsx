"use client";

import { useEffect, useRef } from "react";
import { Button } from "./button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export function Modal({ open, onClose, title, children, actions }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="rounded-xl border-0 p-0 shadow-xl backdrop:bg-black/50"
    >
      <div className="w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="mt-3 text-sm text-gray-600">{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          {actions ?? (
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </dialog>
  );
}
