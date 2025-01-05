import { useState, useEffect } from 'react';
import axios from '../../utils/axios.jsx';
import { Users, UserMinus, Loader2, UserX } from 'lucide-react';

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('/users/friends');
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const handleUnfriend = async (friendId) => {
    // Add unfriend logic here
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-lg">Loading your friends list...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">My Friends</h2>
        </div>
        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          {friends.length} {friends.length === 1 ? 'Friend' : 'Friends'}
        </span>
      </div>

      {/* Friends List */}
      {friends.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <UserX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Friends Yet</h3>
          <p className="text-gray-500">Start connecting with other users to build your friend list!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {friends.map((friend) => (
            <div 
              key={friend._id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                    {friend.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{friend.username}</h3>
                    <p className="text-sm text-gray-500">Friend</p>
                  </div>
                </div>
                <button
                  onClick={() => handleUnfriend(friend._id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <UserMinus className="w-4 h-4" />
                  <span>Unfriend</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendList;