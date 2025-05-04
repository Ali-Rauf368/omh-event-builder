import React from 'react';
import axios from 'axios';

const EventItem = ({ event, onEdit, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/events/${event.id}`);
      onDelete(); 
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
      <p className="text-sm text-gray-500">{event.date}</p>
      <p className="mt-2 text-gray-700">{event.description}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(event)}
          className="bg-omhblue hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventItem;

