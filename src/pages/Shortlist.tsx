import React, { useState, useEffect } from 'react';
import { Star, Trash2, Heart, AlertCircle } from 'lucide-react';
import { Match } from '../types';
import { getShortlist, removeFromShortlist } from '../utils/localStorage';
import Toast from '../components/Toast';

const Shortlist: React.FC = () => {
  const [shortlist, setShortlist] = useState<Match[]>([]);
  const [toast, setToast] = useState({ message: '', type: 'success' as const, isVisible: false });

  useEffect(() => {
    setShortlist(getShortlist());
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const handleRemove = (match: Match) => {
    removeFromShortlist(match.id);
    setShortlist(getShortlist());
    showToast(`${match.name} removed from shortlist`, 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Star className="w-10 h-10 text-yellow-500" />
            Your Shortlist
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep track of your favorite matches and potential companions
          </p>
        </div>

        {shortlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
              <Heart className="w-10 h-10 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your shortlist is empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring matches and save your favorites here. Your shortlisted matches will appear in this space.
            </p>
            <a
              href="/matches"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Find Matches
            </a>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {shortlist.length} saved match{shortlist.length !== 1 ? 'es' : ''}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shortlist.map((match) => (
                <div
                  key={match.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {match.name}
                      </h3>
                      <p className="text-gray-600">{match.age} years old</p>
                    </div>
                    <button
                      onClick={() => handleRemove(match)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                      title="Remove from shortlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">
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

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      All interests: {match.interests.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
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

export default Shortlist;