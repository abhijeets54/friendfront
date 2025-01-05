import { useState } from 'react';
import axios from '../../utils/axios.jsx';

const FriendSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`/users/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      await axios.post('/friends/request', { recipientId: userId });
      // Update UI to show request sent
      setSearchResults(results => 
        results.map(user => 
          user._id === userId 
            ? { ...user, requestSent: true }
            : user
        )
      );
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="space-y-2">
        {searchResults.map((user) => (
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
    </div>
  );
};

export default FriendSearch;