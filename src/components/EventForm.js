import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ eventToEdit, onSave }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDate(eventToEdit.date);
      setDescription(eventToEdit.description);
      setImage(eventToEdit.image);
      setPreview(eventToEdit.image);
    } else {
      setTitle('');
      setDate('');
      setDescription('');
      setImage('');
      setPreview('');
    }
  }, [eventToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  // base64 string
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      date,
      description,
      image, // base64 image string
    };

    try {
      if (eventToEdit) {
        await axios.put(`http://localhost:5000/events/${eventToEdit.id}`, newEvent);
        alert('Event updated successfully!');
      } else {
        await axios.post('http://localhost:5000/events', newEvent);
        alert('Event created successfully!');
      }

      onSave();
      setTitle('');
      setDate('');
      setDescription('');
      setImage('');
      setPreview('');
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event');
    }
  };

  return (
    <div className="container mx-auto p-4 sm:px-6 md:px-8 lg:px-10">
      <h2 className="text-2xl font-semibold mb-4">{eventToEdit ? 'Edit Event' : 'Create a New Event'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Event Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
          {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>

        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded w-full sm:w-auto">
          {eventToEdit ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
