export interface Itinerary {
  day: number;
  title: string;
  description: string;
}

export interface Expedition {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: 'Easy' | 'Easy/Moderate' | 'Moderate' | 'Difficult';
  type: 'Trek' | 'Expedition' | 'Fun Activity';
  region: 'Garhwal' | 'Kumaon';
  altitude: number;
  altitudeText: string;
  duration: number;
  durationText: string;
  price: number;
  priceText: string;
  startMonth: string;
  endMonth: string;
  bestSeason: string;
  featured: boolean;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  coverImage: string;
  galleryImages: string[];
  itinerary: Itinerary[];
  included: string[];
  excluded: string[];
  highlights: string[];
  maxGroupSize: number;
  minAge: number;
  meetingPoint: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  trek: string;
  date: string;
  rating: number;
  review: string;
  photo: string;
  featured: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Trek' | 'Expedition' | 'Camp' | 'Wildlife' | 'Culture';
  expedition: string;
  url: string;
  featured: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  trekInterest: string;
  groupSize?: number;
  preferredDate?: string;
  message: string;
}
