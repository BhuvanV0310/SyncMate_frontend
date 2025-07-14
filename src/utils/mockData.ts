import { Match } from '../types';

export const INTEREST_OPTIONS = [
  'Travel', 'Photography', 'Music', 'Reading', 'Cooking', 'Fitness', 'Gym',
  'Art', 'Technology', 'Dancing', 'Gaming', 'Hiking', 'Movies',
  'Writing', 'Sports', 'Yoga', 'Learning Languages', 'Volunteering',
  'Fashion', 'Gardening', 'Meditation'
];

// Expanded demo data with 20 diverse profiles
const DEMO_PROFILES = [
  { 
    name: 'Amit', 
    age: 23, 
    interests: ['Music', 'Technology', 'Sports', 'Gaming', 'Gym'],
    bio: 'Tech enthusiast who loves coding by day and gaming by night. Always up for a good workout session or jamming to music!',
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Mumbai, India'
  },
  { 
    name: 'Sanya', 
    age: 25, 
    interests: ['Technology', 'Music', 'Reading', 'Art'],
    bio: 'Software developer with a passion for digital art and indie music. Love exploring new books and creating digital masterpieces.',
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Bangalore, India'
  },
  { 
    name: 'Nikhil', 
    age: 27, 
    interests: ['Sports', 'Gaming', 'Technology', 'Fitness', 'Gym'],
    bio: 'Fitness coach and esports enthusiast. Believe in maintaining a healthy balance between physical and digital worlds.',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Delhi, India'
  },
  { 
    name: 'Priya', 
    age: 24, 
    interests: ['Travel', 'Photography', 'Music', 'Dancing'],
    bio: 'Travel blogger and photographer capturing beautiful moments around the world. Dance is my therapy and music is my soul.',
    profilePicture: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Goa, India'
  },
  { 
    name: 'Rahul', 
    age: 29, 
    interests: ['Cooking', 'Travel', 'Reading', 'Movies'],
    bio: 'Chef by profession, traveler by heart. Love experimenting with cuisines from different cultures and discussing great films.',
    profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Chennai, India'
  },
  { 
    name: 'Ananya', 
    age: 26, 
    interests: ['Yoga', 'Meditation', 'Art', 'Gardening'],
    bio: 'Yoga instructor and mindfulness coach. Find peace in creating art and nurturing plants. Believer in holistic wellness.',
    profilePicture: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Pune, India'
  },
  { 
    name: 'Vikram', 
    age: 31, 
    interests: ['Hiking', 'Photography', 'Travel', 'Sports'],
    bio: 'Adventure photographer documenting mountain trails and hidden gems. Weekend warrior who loves outdoor sports and exploration.',
    profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Manali, India'
  },
  { 
    name: 'Kavya', 
    age: 22, 
    interests: ['Writing', 'Reading', 'Music', 'Movies'],
    bio: 'Aspiring novelist and film critic. Spend my days crafting stories and nights watching indie films. Music fuels my creativity.',
    profilePicture: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Kolkata, India'
  },
  { 
    name: 'Arjun', 
    age: 28, 
    interests: ['Gaming', 'Technology', 'Movies', 'Music'],
    bio: 'Game developer and tech reviewer. Love creating immersive experiences and analyzing the latest tech trends. Sci-fi movie buff.',
    profilePicture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Hyderabad, India'
  },
  { 
    name: 'Meera', 
    age: 30, 
    interests: ['Dancing', 'Fitness', 'Music', 'Fashion', 'Gym'],
    bio: 'Professional dancer and fitness influencer. Passionate about expressing emotions through movement and inspiring healthy lifestyles.',
    profilePicture: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Mumbai, India'
  },
  { 
    name: 'Rohan', 
    age: 25, 
    interests: ['Sports', 'Fitness', 'Travel', 'Gaming', 'Gym'],
    bio: 'Professional athlete and travel enthusiast. Believe in pushing physical limits while exploring new destinations and cultures.',
    profilePicture: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Jaipur, India'
  },
  { 
    name: 'Ishita', 
    age: 27, 
    interests: ['Art', 'Photography', 'Fashion', 'Travel'],
    bio: 'Fashion photographer and visual artist. Love capturing the intersection of style and culture through my lens across different cities.',
    profilePicture: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Mumbai, India'
  },
  { 
    name: 'Karan', 
    age: 24, 
    interests: ['Technology', 'Gaming', 'Reading', 'Learning Languages'],
    bio: 'AI researcher and polyglot. Fascinated by the intersection of technology and human communication. Currently learning my 6th language!',
    profilePicture: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Bangalore, India'
  },
  { 
    name: 'Shreya', 
    age: 26, 
    interests: ['Cooking', 'Gardening', 'Yoga', 'Volunteering'],
    bio: 'Sustainable living advocate and community organizer. Love growing my own food and sharing healthy recipes with others.',
    profilePicture: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Mysore, India'
  },
  { 
    name: 'Aditya', 
    age: 29, 
    interests: ['Music', 'Writing', 'Movies', 'Art'],
    bio: 'Music producer and screenwriter. Create soundtracks for indie films and write stories that blend reality with imagination.',
    profilePicture: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Mumbai, India'
  },
  { 
    name: 'Nisha', 
    age: 23, 
    interests: ['Dancing', 'Music', 'Fashion', 'Photography'],
    bio: 'Contemporary dancer and fashion blogger. Express creativity through movement and style, capturing moments that tell stories.',
    profilePicture: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Delhi, India'
  },
  { 
    name: 'Sameer', 
    age: 32, 
    interests: ['Hiking', 'Travel', 'Sports', 'Meditation'],
    bio: 'Mountain guide and mindfulness teacher. Find peace in nature and help others discover the therapeutic power of outdoor adventures.',
    profilePicture: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Rishikesh, India'
  },
  { 
    name: 'Riya', 
    age: 25, 
    interests: ['Reading', 'Writing', 'Learning Languages', 'Volunteering'],
    bio: 'Social worker and aspiring author. Passionate about education and literacy programs. Currently writing a novel about cultural diversity.',
    profilePicture: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Pune, India'
  },
  { 
    name: 'Dev', 
    age: 28, 
    interests: ['Technology', 'Gaming', 'Fitness', 'Movies', 'Gym'],
    bio: 'Full-stack developer and fitness enthusiast. Code during the day, game at night, and hit the gym whenever possible. Marvel fan!',
    profilePicture: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Bangalore, India'
  },
  { 
    name: 'Tara', 
    age: 24, 
    interests: ['Yoga', 'Meditation', 'Travel', 'Photography'],
    bio: 'Wellness coach and travel photographer. Combine my love for mindfulness with capturing serene moments from around the world.',
    profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Goa, India'
  }
];

export const generateMockMatches = (userInterests: string[], excludeNames: string[] = []): Match[] => {
  return DEMO_PROFILES
    .filter(profile => !excludeNames.includes(profile.name))
    .map(profile => {
      const sharedInterests = profile.interests.filter(interest => 
        userInterests.includes(interest)
      );
      
      // Only return matches with at least 2 shared interests (like the example)
      if (sharedInterests.length < 2) return null;
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: profile.name,
        age: profile.age,
        interests: profile.interests,
        sharedInterests,
        bio: profile.bio,
        profilePicture: profile.profilePicture,
        location: profile.location
      };
    })
    .filter((match): match is Match => match !== null)
    .sort((a, b) => b.sharedInterests.length - a.sharedInterests.length);
};

// Function to get matches for a specific username (simulating API call)
export const getMatchesForUser = (username: string, userInterests: string[]): Match[] => {
  // Find the user profile
  const userProfile = DEMO_PROFILES.find(profile => 
    profile.name.toLowerCase() === username.toLowerCase()
  );
  
  if (!userProfile) {
    return [];
  }
  
  // Generate matches based on the found user's interests
  return generateMockMatches(userProfile.interests, [userProfile.name]);
};

// Function to simulate searching by username and returning matches
export const searchMatches = (searchUsername: string, currentUserInterests: string[] = []): Match[] => {
  // If we have a current user's interests, use those for matching
  if (currentUserInterests.length > 0) {
    return generateMockMatches(currentUserInterests, [searchUsername]);
  }
  
  // Otherwise, find matches for the searched username
  return getMatchesForUser(searchUsername, []);
};