import { useState, useEffect } from 'react';
import axios from '../../utils/axios.jsx';

const FriendRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('/friends/recommendations');
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const sendFriendRequest = async (userId) => {
    try {
      await axios.post('/friends/request', { recipientId: userId });
      setRecommendations(current =>
        current.map(user =>
          user._id === userId
            ? { ...user, requestSent: true }
            : user
        )
      );
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommended Friends</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available</p>
      ) : (
        <div className="space-y-2">
          {recommendations.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-2 bg-white rounded shadow"
            >
              <span>{user.username}</span>
              <button
                onClick={() => sendFriendRequest(user._id)}
                disabled={user.requestSent}
                className={`px-3 py-1 rounded ${
                  user.requestSent
                    ? 'bg-gray-300'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {user.requestSent ? 'Request Sent' : 'Add Friend'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRecommendations;