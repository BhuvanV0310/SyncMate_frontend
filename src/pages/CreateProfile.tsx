import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Check, User, Calendar, Heart, Camera, Upload } from 'lucide-react';
import { INTEREST_OPTIONS } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';
import Toast from '../components/Toast';
import { createUser } from '../utils/api';

const CreateProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age?.toString() || '',
    interests: user?.interests || [] as string[],
    bio: user?.bio || '',
    profilePicture: user?.profilePicture || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
            <User className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to create or edit your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/login"
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors text-center"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex-1 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const validateField = (field: string, value: any) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'age':
        const ageNum = parseInt(value);
        if (!value) {
          newErrors.age = 'Age is required';
        } else if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
          newErrors.age = 'Age must be between 18 and 100';
        } else {
          delete newErrors.age;
        }
        break;
      case 'interests':
        if (value.length === 0) {
          newErrors.interests = 'Please select at least one interest';
        } else {
          delete newErrors.interests;
        }
        break;
      case 'bio':
        if (value.length > 250) {
          newErrors.bio = 'Bio must be 250 characters or less';
        } else {
          delete newErrors.bio;
        }
        break;
      case 'profilePicture':
        // No validation needed for profile picture
        delete newErrors.profilePicture;
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const toggleInterest = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    
    handleInputChange('interests', newInterests);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        return;
      }
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        handleInputChange('profilePicture', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    validateField('name', formData.name);
    validateField('age', formData.age);
    validateField('interests', formData.interests);
    validateField('bio', formData.bio);
    
    if (Object.keys(errors).length > 0 || !formData.name || !formData.age || formData.interests.length === 0) {
      return;
    }

    setIsSubmitting(true);
    
    try {
  const profilePayload = {
    name: formData.name,
    age: parseInt(formData.age),
    interests: formData.interests,
    bio: formData.bio,
    profilePicture: formData.profilePicture
  };

  await createUser(profilePayload);
  updateProfile(profilePayload); // Still update frontend context

  showToast('Profile created successfully!', 'success');
  navigate('/matches');
} catch (error) {
  showToast('Failed to create profile. Try again.', 'error');
}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-emerald-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <User className="w-8 h-8" />
              {user?.interests?.length ? 'Edit Your Profile' : 'Create Your Profile'}
            </h1>
            <p className="text-emerald-100 mt-2">Tell us about yourself to find your perfect matches</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {!errors.name && formData.name && (
                  <Check className="absolute right-3 top-3.5 w-5 h-5 text-emerald-500" />
                )}
              </div>
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Age Field */}
            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-semibold text-gray-700">
                Age *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    errors.age ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                />
                {!errors.age && formData.age && (
                  <Check className="absolute right-3 top-3.5 w-5 h-5 text-emerald-500" />
                )}
              </div>
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">
                Bio
              </label>
              <div className="relative">
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none ${
                    errors.bio ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  maxLength={250}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {formData.bio.length}/250
                </div>
              </div>
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
            </div>

            {/* Profile Picture Upload */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                <label className="block text-sm font-semibold text-gray-700">
                  Profile Picture
                </label>
              </div>
              
              <div className="flex items-center gap-6">
                {/* Image Preview */}
                <div className="flex-shrink-0">
                  {formData.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt="Profile preview"
                      className="w-20 h-20 rounded-full object-cover border-4 border-emerald-100"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Upload Button */}
                <div className="flex-1">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Upload className="w-4 h-4" />
                    Choose Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Interests Field */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-emerald-600" />
                <label className="block text-sm font-semibold text-gray-700">
                  Interests * ({formData.interests.length} selected)
                </label>
              </div>
              <p className="text-sm text-gray-600">Select all that apply to help us find your perfect matches</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {INTEREST_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      formData.interests.includes(interest)
                        ? 'bg-emerald-600 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              {errors.interests && <p className="text-red-500 text-sm">{errors.interests}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-lg transition-all ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Profile...
                </div>
              ) : (
                <>
                  {user?.interests?.length ? 'Update Profile' : 'Create Profile'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default CreateProfile;