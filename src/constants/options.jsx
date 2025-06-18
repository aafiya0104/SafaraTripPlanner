export const SelectTravelList = [
  {
    id: 1,
    title: 'Solo Woman',
    desc: 'A solo woman traveler',
    icon: '👩‍🦰',
    people: '1',
  },
  {
    id: 2,
    title: 'Duo',
    desc: 'Two people traveling together',
    icon: '👭',
    people: '2',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A family with children',
    icon: '👨‍👩‍👧‍👦',
    people: '3-5',
  },
  {
    id: 4,
    title: 'Group',
    desc: 'A group of friends traveling together',
    icon: '👯‍♀️👯‍♀️',
    people: '5+',
  },
];

export const SelectBudgetList = [
  {
    id: 1,
    title: 'Budget',
    desc: 'Affordable options for budget travelers',
    icon: '💰',
  },
  {
    id: 2,
    title: 'Mid-range',
    desc: 'Comfortable options for mid-range travelers',
    icon: '💳',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'High-end options for luxury travelers',
    icon: '💎',
  },
];

export const AI_PROMPT = 'Generate Safe Women\'s Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget. Give me a safe women-friendly Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days with each day plan with safest time to visit in JSON format.';