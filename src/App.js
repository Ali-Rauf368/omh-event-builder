import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventItem from './components/EventItem';
import EventForm from './components/EventForm';

function App() {
  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);

  const fetchEvents = () => {
    axios
      .get('http://localhost:5000/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event) => {
    setEventToEdit(event);
  };

  const handleSave = () => {
    setEventToEdit(null);
    fetchEvents();
  };

  const handleDelete = () => {
    fetchEvents();
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow p-6">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-3xl font-bold text-omhblue">🎉 OMH Event Manager</h1>
          <p className="text-gray-500 mt-1">Create and manage events easily</p>
        </div>
      </header>

      <main className="max-w-screen-lg mx-auto px-4 py-8">
        <EventForm eventToEdit={eventToEdit} onSave={handleSave} />
        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">Upcoming Events</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <EventItem
              key={event.id}
              event={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t mt-12 py-4 text-center text-gray-500 text-sm">
        &copy; 2025 OMH.net. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
