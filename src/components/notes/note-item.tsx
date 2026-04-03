"use client";

import { useState } from "react";
import { deleteNote } from "@/lib/actions/notes";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Note } from "@/lib/types";
import { Trash2, User, Clock } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NoteItem({ note, companyId }: { note: Note; companyId: string }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await deleteNote(companyId, note.id);
    setConfirmOpen(false);
    setLoading(false);
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-semibold text-gray-900">{note.title}</h4>
        <button
          onClick={() => setConfirmOpen(true)}
          className="shrink-0 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-1.5 whitespace-pre-wrap text-sm text-gray-600">{note.content}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {formatDate(note.created_at)}
        </span>
        {note.created_by && (
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {note.created_by}
          </span>
        )}
      </div>
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete note"
        actions={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="danger" loading={loading} onClick={handleDelete}>Delete</Button>
          </>
        }
      >
        <p>Delete this note? This cannot be undone.</p>
      </Modal>
    </div>
  );
}
