import React, { useEffect, useState, useContext } from 'react';
import axios from '../../utils/axios';
import { AuthContext } from '../../context/AuthContext';

const ReceivedRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return; // Check if user is defined
      try {
        const response = await axios.get('/api/friends/requests', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Use token from local storage
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    fetchRequests();
  }, [user]);

  const handleAccept = async (requestId) => {
    try {
      await axios.post('/api/friends/respond', {
        requestId,
        status: 'accepted'
      });
      setRequests(requests.filter(request => request._id !== requestId));
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  return (
    <div>
      <h2>Received Friend Requests</h2>
      {requests.length === 0 ? (
        <p>No received friend requests.</p>
      ) : (
        <ul>
          {requests.map(request => (
            <li key={request._id}>
              {request.sender.username}
              <button onClick={() => handleAccept(request._id)}>Accept</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReceivedRequests;
