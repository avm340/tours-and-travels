export type Car = {
  id: string;
  name: string;
  category: "Sedan" | "SUV" | "Premium SUV" | "Tempo Traveller";
  seats: number;
  pricePerKm: number;
  images: string[];
  features: string[];
  bestFor: string[];
  description: string;
};

export const carsData: Car[] = [
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    category: "Premium SUV",
    seats: 7,
    pricePerKm: 20,
    images: [
      "/cars/innova-crysta-7-seater/innova-5.jpg",
      "/cars/innova-crysta-7-seater/innova-1.jpg",
      "/cars/innova-crysta-7-seater/innova-2.jpg",
      "/cars/innova-crysta-7-seater/innova-3.jpg",
      "/cars/innova-crysta-7-seater/innova-4.jpg",
      "/cars/innova-crysta-7-seater/innova-6.jpg"
    ],
    features: ["Fully Air Conditioned", "Spacious Interior", "Music System", "Mobile Charging Points", "Clean & Hygienic Vehicle"],
    bestFor: ["Family Trips", "Outstation Trips", "Airport Transfers", "Corporate Tours"],
    description: "Experience premium comfort with the Toyota Innova Crysta. Perfect for long journeys with family or corporate clients, offering unparalleled ride quality and space."
  },
  {
    id: "innova-crysta-bucket",
    name: "Toyota Innova Crysta (Bucket Seat)",
    category: "Premium SUV",
    seats: 6,
    pricePerKm: 20,
    images: [
      "/cars/innova-crysta-bucket-seats/bucket-2.jpg",
      "/cars/innova-crysta-bucket-seats/bucket-3.jpg",
      "/cars/innova-crysta-bucket-seats/bucket-4.jpg",
      "/cars/innova-crysta-bucket-seats/bucket-5.jpg",
      "/cars/innova-crysta-bucket-seats/bucket-1.jpg"
    ],
    features: ["Bucket Recliner Seats", "Fully Air Conditioned", "Premium Interior", "Music System", "Mobile Charging Points", "Clean & Hygienic Vehicle"],
    bestFor: ["Luxury Family Trips", "Corporate Tours", "Outstation Trips"],
    description: "Travel in luxury with premium bucket seats. The Innova Crysta Bucket Seat variant provides individual comfort for each passenger, making it ideal for long-distance luxury travel."
  },
  {
    id: "innova",
    name: "Toyota Innova",
    category: "SUV",
    seats: 7,
    pricePerKm: 17,
    images: [
      "/cars/toyota-innova/innova-4.jpg",
      "/cars/toyota-innova/innova-1.jpg",
      "/cars/toyota-innova/innova-2.jpg",
      "/cars/toyota-innova/innova-3.jpg",
      "/cars/toyota-innova/innova-5.jpg"
    ],
    features: ["Air Conditioned", "Comfortable Seating", "Music System", "Ample Luggage Space", "Clean & Hygienic Vehicle"],
    bestFor: ["Family Trips", "Outstation Trips", "Pilgrimage Tours"],
    description: "The reliable and comfortable Toyota Innova is the perfect choice for family getaways and group travel, offering a smooth ride and plenty of space."
  },
  {
    id: "rumion",
    name: "Toyota Rumion",
    category: "SUV",
    seats: 7,
    pricePerKm: 16,
    images: [
      "/cars/toyota-rumion/rumion-1.jpg",
      "/cars/toyota-rumion/rumion-2.jpg",
      "/cars/toyota-rumion/rumion-3.jpg",
      "/cars/toyota-rumion/rumion-4.jpg",
      "/cars/toyota-rumion/rumion-5.jpg",
      "/cars/toyota-rumion/rumion-6.jpg"
    ],
    features: ["Air Conditioned", "Flexible Seating", "Music System", "Economical", "Clean & Hygienic Vehicle"],
    bestFor: ["Budget Family Trips", "Weekend Getaways", "Outstation Trips"],
    description: "The Toyota Rumion offers a great balance of space, comfort, and economy for group travel. An excellent choice for families looking for a versatile MUV."
  },
  {
    id: "urbania",
    name: "Force Urbania Traveller",
    category: "Tempo Traveller",
    seats: 16,
    pricePerKm: 32,
    images: [
      "/cars/urbania/urbania-3.jpg",
      "/cars/urbania/urbania-1.jpg",
      "/cars/urbania/urbania-2.jpg",
      "/cars/urbania/urbania-4.jpg",
      "/cars/urbania/urbania-5.jpg"
    ],
    features: ["Pushback Recliner Seats", "Fully Air Conditioned", "Premium Luxury Interior", "LED Ambient Lighting", "Music System / Screen", "Mobile Charging Points", "Spacious & Comfortable", "Clean & Hygienic Vehicle"],
    bestFor: ["Large Family Trips", "Corporate Tours", "Pilgrimage Tours", "Airport Transfers", "Group Outstation Trips"],
    description: "Travel in comfort, style, and luxury with our AC Push-Back Traveller. Designed for those who expect more, whether it's a large family getaway, corporate travel, or a weekend adventure—we ensure you arrive in style, every time."
  },
  {
    id: "swift-dzire",
    name: "Maruti Swift",
    category: "Sedan",
    seats: 5,
    pricePerKm: 14,
    images: [
      "/cars/swift/swift-4.jpg",
      "/cars/swift/swift-1.jpg",
      "/cars/swift/swift-2.jpg",
      "/cars/swift/swift-3.jpg"
    ],
    features: ["Air Conditioned", "Comfortable Seating", "Music System", "Economical", "Clean & Hygienic Vehicle"],
    bestFor: ["Couple Trips", "Solo Travel", "Business Trips", "Short Outstation Trips"],
    description: "The Maruti Swift is a comfortable and economical sedan perfect for small families, couples, or solo business travelers."
  }
];
