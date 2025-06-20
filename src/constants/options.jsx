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

export const AI_PROMPT = `Generate Safe Women's Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget.

CRITICAL REQUIREMENTS:
- You MUST provide EXACTLY 4 hotel recommendations - no more, no less
- Count the hotels before responding: 1, 2, 3, 4 - ensure all 4 are included
- If fewer than 4 hotels exist for the budget/location, create budget alternatives or nearby options

HOTEL REQUIREMENTS:
Provide exactly 4 safe women-friendly Hotels with:
- HotelName
- HotelAddress  
- PriceRange
- HotelImageUrl
- GeoCoordinates (latitude, longitude)
- Rating
- Description

ITINERARY REQUIREMENTS:
Suggest itinerary for {totalDays} days with each day plan including:
- PlaceName
- PlaceDetails
- PlaceImageUrl
- GeoCoordinates
- TicketPricing
- TimeToTravel

OUTPUT FORMAT: Respond ONLY with valid JSON format. No additional text before or after the JSON.

EXAMPLE HOTEL STRUCTURE:
{
  "hotels": [
    {"HotelName": "Hotel 1", ...},
    {"HotelName": "Hotel 2", ...},
    {"HotelName": "Hotel 3", ...},
    {"HotelName": "Hotel 4", ...}
  ],
  "itinerary": {...}
}

Remember: Exactly 4 hotels required. Count them: 1, 2, 3, 4.`;