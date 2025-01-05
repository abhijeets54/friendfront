import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import FriendList from '../Friends/FriendList';
import FriendSearch from '../Friends/FriendSearch';
import FriendRecommendations from '../Friends/FriendRecommendations';
import ReceivedRequests from '../Friends/ReceivedRequests'; // Importing the new component

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('friends');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">Friends App</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.username}!</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('friends')}
            className={`px-4 py-2 rounded ${
              activeTab === 'friends'
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            My Friends
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded ${
              activeTab === 'search'
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Search Users
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 rounded ${
              activeTab === 'recommendations'
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Recommendations
          </button>
          <button
            onClick={() => setActiveTab('receivedRequests')}
            className={`px-4 py-2 rounded ${
              activeTab === 'receivedRequests'
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Received Requests
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          {activeTab === 'friends' && <FriendList />}
          {activeTab === 'search' && <FriendSearch />}
          {activeTab === 'recommendations' && <FriendRecommendations />}
          {activeTab === 'receivedRequests' && <ReceivedRequests />} {/* Render the new component */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
