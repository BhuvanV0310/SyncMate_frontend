import React from 'react';
import { X, User, Calendar, Heart, MapPin } from 'lucide-react';
import { Match } from '../types';

interface ProfileModalProps {
  match: Match;
  isOpen: boolean;
  onClose: () => void;
  onShortlist: (match: Match) => void;
  isShortlisted: boolean;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ 
  match, 
  isOpen, 
  onClose, 
  onShortlist, 
  isShortlisted 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Profile Details</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Profile Header */}
            <div className="flex items-start gap-6 mb-8">
              {match.profilePicture ? (
                <img
                  src={match.profilePicture}
                  alt={match.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-emerald-100"
                />
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <User className="w-16 h-16 text-emerald-600" />
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{match.name}</h3>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{match.age} years old</span>
                  </div>
                  {match.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{match.location}</span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => onShortlist(match)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    isShortlisted
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isShortlisted ? 'Shortlisted ✓' : 'Add to Shortlist'}
                </button>
              </div>
            </div>

            {/* Bio Section */}
            {match.bio && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">About</h4>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
                  {match.bio}
                </p>
              </div>
            )}

            {/* Shared Interests */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-emerald-600" />
                Shared Interests ({match.sharedInterests.length})
              </h4>
              <div className="flex flex-wrap gap-3">
                {match.sharedInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* All Interests */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">All Interests</h4>
              <div className="flex flex-wrap gap-2">
                {match.interests.map((interest) => (
                  <span
                    key={interest}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      match.sharedInterests.includes(interest)
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Compatibility Score */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Compatibility</h4>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Match Score</span>
                    <span>{Math.round((match.sharedInterests.length / match.interests.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(match.sharedInterests.length / match.interests.length) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-2xl font-bold text-emerald-600">
                  {match.sharedInterests.length}/{match.interests.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;