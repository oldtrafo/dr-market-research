import { NoteForm } from "./note-form";
import { NoteItem } from "./note-item";
import { createNote } from "@/lib/actions/notes";
import type { Note } from "@/lib/types";
import { MessageSquare } from "lucide-react";

type NotesSectionProps = {
  companyId: string;
  notes: Note[];
};

export function NotesSection({ companyId, notes }: NotesSectionProps) {
  const boundCreateNote = createNote.bind(null, companyId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-gray-400" />
        <h3 className="text-base font-semibold text-gray-900">Notes</h3>
        <span className="text-sm text-gray-400">({notes.length})</span>
      </div>

      <NoteForm action={boundCreateNote} />

      {notes.length > 0 ? (
        <div className="space-y-3">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} companyId={companyId} />
          ))}
        </div>
      ) : (
        <p className="py-4 text-center text-sm text-gray-400">No notes yet. Add one above.</p>
      )}
    </div>
  );
}
