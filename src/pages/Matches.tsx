import React, { useState, useEffect } from 'react';
import { Users, AlertCircle, User, MapPin, Eye } from 'lucide-react';
import { Match } from '../types';
import { addToShortlist, isInShortlist } from '../utils/localStorage';
import { useAuth } from '../contexts/AuthContext';
import SkeletonCard from '../components/SkeletonCard';
import ProfileModal from '../components/ProfileModal';
import Toast from '../components/Toast';
import { fetchMatches } from '../utils/api';

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({ message: '', type: 'success', isVisible: false });

  const { user, isAuthenticated } = useAuth();

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const loadMatches = async () => {
  if (!user?.name) return;

  setIsLoading(true);
  try {
    const result = await fetchMatches(user.name);
    setMatches(result);
  } catch (err) {
    showToast('Failed to load matches', 'error');
  } finally {
    setIsLoading(false);
    setHasLoaded(true);
  }
};

  useEffect(() => {
    if (isAuthenticated && user?.interests?.length) {
      loadMatches();
    }
  }, [isAuthenticated, user]);

  const handleShortlist = (match: Match) => {
    if (isInShortlist(match.id)) {
      showToast('Already in your shortlist!', 'info');
      return;
    }
    
    addToShortlist(match);
    showToast(`${match.name} added to shortlist!`, 'success');
  };

  const handleViewProfile = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  // Redirect to create profile if user hasn't completed their profile
  if (isAuthenticated && (!user?.interests?.length || !user?.age)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Profile</h2>
          <p className="text-gray-600 mb-6">Please complete your profile to see matches.</p>
          <a href="/create-profile" className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
            Complete Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Users className="w-10 h-10 text-emerald-600" />
            Find Your Matches
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover people who share at least 2 interests with you
          </p>
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h2>
            <div className="flex items-start gap-6">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
                  <User className="w-12 h-12 text-emerald-600" />
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{user.name}</h3>
                <p className="text-gray-600 mb-3">{user.age} years old</p>
                {user.bio && (
                  <p className="text-gray-700 mb-4">{user.bio}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {!isLoading && hasLoaded && matches.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No matches found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any matches based on your interests. Try updating your profile with more interests to find better matches.
            </p>
            <a
              href="/create-profile"
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Update Profile
            </a>
          </div>
        )}

        {!isLoading && matches.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Found {matches.length} match{matches.length !== 1 ? 'es' : ''} for you
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleViewProfile(match)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    {match.profilePicture ? (
                      <img
                        src={match.profilePicture}
                        alt={match.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-emerald-100 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-8 h-8 text-emerald-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {match.name}
                      </h3>
                      <p className="text-gray-600 mb-1">{match.age} years old</p>
                      {match.location && (
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {match.location}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Bio Preview */}
                  {match.bio && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {match.bio.length > 80 ? `${match.bio.substring(0, 80)}...` : match.bio}
                      </p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShortlist(match);
                      }}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
                        isInShortlist(match.id)
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {isInShortlist(match.id) ? 'Shortlisted' : 'Shortlist'}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      Shared interests ({match.sharedInterests.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {match.sharedInterests.map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Click to view full profile
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Profile Modal */}
        {selectedMatch && (
          <ProfileModal
            match={selectedMatch}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onShortlist={handleShortlist}
            isShortlisted={isInShortlist(selectedMatch.id)}
          />
        )}

        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
        />
      </div>
    </div>
  );
};

export default Matches;