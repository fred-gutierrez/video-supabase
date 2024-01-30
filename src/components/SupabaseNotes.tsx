import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

interface data {
  note: string,
  id: number
}

export function SupabaseNotes() {
  const [notes, setNotes] = useState<data[]>([]);
  const [newNote, setNewNote] = useState<string>('');

  useEffect(() => {
    supabase.auth.signInWithPassword({
      email: 'fredlikesminecraft@gmail.com',
      password: 'minecraft'
    })
  }, [])

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("note, id")

    if (data) {
      setNotes(data)
    }
    if (error) {
      console.error("Could not fetch the data", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [notes])

  const addNote = async () => {
    if (newNote.trim() !== "") {
      const { error } = await supabase
        .from("notes")
        .insert({ note: newNote })

      if (error) {
        console.error(error)
      } else {
        setNewNote('')
      }
    }
  };

  const deleteNote = async (index: number) => {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", index)

    if (error) {
      console.error("Unable to delete note ", error)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Note Taking App</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your note..."
          className="w-full px-2 py-1 border rounded"
        />
        <button
          onClick={addNote}
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add Note
        </button>
      </div>

      <ul>
        {notes.map((data) => (
          <li key={data.id} className="mb-2">
            {data.note}
            <button
              onClick={() => deleteNote(data.id)}
              className="ml-2 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
