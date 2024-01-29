import { useState, useEffect } from 'react';

export function LocalStorageNotes() {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState<string>('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]') as string[];
    if (storedNotes.length > 0) {
      setNotes(storedNotes)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const deleteNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
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
        {notes.map((note, index) => (
          <li key={index} className="mb-2">
            {note}
            <button
              onClick={() => deleteNote(index)}
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
