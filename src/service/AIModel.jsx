import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

if (!apiKey) {
  console.error(
    "VITE_GOOGLE_GEMINI_AI_API_KEY is not set in environment variables"
  );
}

const ai = new GoogleGenerativeAI(apiKey);

const model = ai.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.7,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Safe Women's Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a safe women-friendly Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo coordinates, ticket Pricing, Time to travel each of the location for 3 days with each day plan with safest time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Define the Scope\n\nI've homed in on the core request: a safety-focused itinerary for a couple on a budget in Las Vegas. The key components - safety, budget, and a couple - are shaping the framework. I'm focusing on the three-day timeframe now, determining budget-friendly activities and accommodation that prioritizes safety. I'm exploring options that involve transportation and pre-booked activities to avoid any on-the-spot surprises.\n\n\nRefining the Focus\n\nI'm now prioritizing safety and budget in the itinerary. Understanding the key constraint of a \"cheap budget,\" I'm digging into free and low-cost attractions, affordable dining, and safe, budget-friendly hotels. The JSON format necessitates a structured approach, so I'm creating a clear template for hotels and itinerary details. This involves researching specific hotels, evaluating activities for price and safety, and determining the best times for these activities. The goal is a concrete, implementable plan.\n\n\nFinalizing Hotel Options\n\nI'm now zeroing in on a finalized list of budget-friendly, safe hotels. Based on reviews and locations, I'm leaning towards a few specific options that align well with safety and cost considerations. I'm focusing on hotels that offer good value for money without sacrificing security. The descriptions, prices, and images are all being prepared for JSON formatting.\n\n\nEvaluating Hotel Options\n\nI'm now zeroing in on a finalized list of budget-friendly, safe hotels. I'm focusing on hotels that have good reviews concerning safety without sacrificing value. I'm preparing descriptions, prices, and images for the JSON format. Finding options that avoid resort fees seems to be difficult, but I'll focus on the ones with the lowest.\n\n\nStructuring the Plan\n\nI'm now integrating the itinerary into the JSON format. The focus is on a structured output with clear sections for hotels and daily itineraries, each with details like names, descriptions, and safety-related recommendations. I'm prioritizing clear and concise formatting to ensure a smooth read for a user expert in the field. I am also making sure that the data for the hotel and itinerary details are accurate.\n\n\nConstructing a Framework\n\nI'm synthesizing the hotel and itinerary strategies to form a cohesive plan. It will prioritize cost-effective and secure activities and accommodations. I am focusing on building a 3-day itinerary. Finding options near the Strip while accounting for budget is proving to be a challenge. The final step is formatting the output in a JSON structure.\n\n\nCrafting a Viable Itinerary\n\nI've completed the initial itinerary framework, incorporating safe, budget-friendly activities. I'm focusing on refining transportation options within the safe zone, evaluating activity timings for peak safety, and researching affordable dining. Structuring the 3-day plan in JSON format is now the central task, ensuring it presents a well-rounded and safe itinerary for the couple. I am also making sure that the data for each day of the itinerary is correct.\n\n\nRevising Itinerary Options\n\nI'm now focusing on crafting the 3-day itinerary, considering safe routes and activities. I'm prioritizing options that offer the best balance of safety and cost-effectiveness for the couple. I'm structuring each day to ensure easy access to transport and well-lit areas. The goal is a concise and safe itinerary.\n\nDeveloping the Framework\n\nI'm now establishing a foundational framework, emphasizing the \"cheap budget\" aspect. I'm focusing on free activities like window-shopping and street performances along with budget-friendly eats to balance safety and financial constraints. My focus is on creating a comprehensive 3-day itinerary that aligns with the couple's needs."
        },
        {
          text: `{
  "Note": "This travel plan prioritizes safety and budget for a couple, focusing on well-populated, well-lit areas on or near the Las Vegas Strip and Fremont Street. Prices are estimates and highly variable depending on the time of year, day of the week, and booking platform. Always check current reviews and safety information closer to your travel dates. Use ride-sharing services (Uber/Lyft) or taxis, especially at night, and be aware of your surroundings. Walking is generally safe on the main, busy parts of the Strip, but exercise caution in less crowded areas or side streets.",
  "hotels": [
    {
      "HotelName": "Excalibur Hotel & Casino",
      "HotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
      "PriceRange": "$50 - $150+ per night (plus resort fee)",
      "HotelImageUrl": "https://example.com/excalibur_image.jpg",
      "GeoCoordinates": {
        "latitude": 36.0979,
        "longitude": -115.1735
      },
      "Rating": 3.5,
      "Description": "Themed as a medieval castle, Excalibur is located at the south end of the Strip. It's known for being one of the more budget-friendly options while still offering casino access, pools, and dining. Its position on the busy southern Strip provides good safety through high foot traffic and security presence.",
      "SafetyNotes": "Located on the busy south Strip with high security presence. Stick to main hotel areas and busy walkways. Covered walkway connects to Luxor and Mandalay Bay."
    },
    {
      "HotelName": "Luxor Hotel & Casino",
      "HotelAddress": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
      "PriceRange": "$60 - $180+ per night (plus resort fee)",
      "HotelImageUrl": "https://example.com/luxor_image.jpg",
      "GeoCoordinates": {
        "latitude": 36.0954,
        "longitude": -115.1756
      },
      "Rating": 3.8,
      "Description": "Recognizable by its pyramid shape and sky beam, Luxor is adjacent to Excalibur. It offers various room types and amenities at a generally lower price point than central Strip resorts. Its unique structure and location on the busy south Strip contribute to its safety profile.",
      "SafetyNotes": "Similar to Excalibur, located on the busy south Strip. Connected by walkway to Excalibur and Mandalay Bay. Security presence is high in the resort."
    },
    {
      "HotelName": "Flamingo Las Vegas Hotel & Casino",
      "HotelAddress": "3555 S Las Vegas Blvd, Las Vegas, NV 89109",
      "PriceRange": "$70 - $250+ per night (plus resort fee)",
      "HotelImageUrl": "https://example.com/flamingo_image.jpg",
      "GeoCoordinates": {
        "latitude": 36.1166,
        "longitude": -115.1708
      },
      "Rating": 3.9,
      "Description": "Located in the heart of the Strip, the Flamingo is one of Vegas's most historic hotels. It offers a central location for walking to many attractions. While older, renovations have updated parts of the hotel. Being centrally located means constant high foot traffic and security.",
      "SafetyNotes": "Prime central Strip location means very high foot traffic and security around the clock. Stick to the main pedestrian areas and inside the resort. Monorail station access is a plus."
    },
    {
      "HotelName": "The Strat Hotel, Casino & Skypod",
      "HotelAddress": "2000 S Las Vegas Blvd, Las Vegas, NV 89104",
      "PriceRange": "$50 - $150+ per night (plus resort fee)",
      "HotelImageUrl": "https://example.com/strat_image.jpg",
      "GeoCoordinates": {
        "latitude": 36.1468,
        "longitude": -115.1553
      },
      "Rating": 3.7,
      "Description": "Located on the northern end of the Strip, The Strat is known for its iconic tower. Hotel prices are generally lower than central Strip resorts. While the immediate surrounding area can be less busy at night than the central Strip, the resort itself has strong security, and staying within the complex or using ride-share is recommended.",
      "SafetyNotes": "Located on the north Strip. Area immediately surrounding can be quieter at night. Stick to the resort property or use ride-share/taxi for transport. The resort itself has extensive security."
    }
  ],
  "itinerary": [
    {
      "Day": 1,
      "Plan": "Arrival & South/Central Strip Exploration",
      "Activities": [
        {
          "PlaceName": "Hotel Check-in & South Strip Walk",
          "PlaceDetails": "Settle into your chosen budget-friendly hotel on the south or central Strip. Take a leisurely walk along the pedestrian walkways connecting hotels like Excalibur, Luxor, and Mandalay Bay (connected by walkways/tram). Explore the lobbies and unique themes.",
          "PlaceImageUrl": "https://example.com/south_strip_walk.jpg",
          "GeoCoordinates": {
            "latitude": 36.096,
            "longitude": -115.174
          },
          "TicketPricing": "Free",
          "TimeToTravel": "2-3 hours",
          "SafestTimeToVisit": "Daytime or early evening (9 AM - 7 PM) when foot traffic is high."
        },
        {
          "PlaceName": "MGM Grand & New York-New York Exploration",
          "PlaceDetails": "Walk or take the tram north to MGM Grand (explore the large lion statue entrance) and then across to New York-New York to see the mock-up of the NYC skyline and Statue of Liberty. These resorts are large and have busy public areas.",
          "PlaceImageUrl": "https://example.com/nyny_mgm.jpg",
          "GeoCoordinates": {
            "latitude": 36.1006,
            "longitude": -115.1713
          },
          "TicketPricing": "Free",
          "TimeToTravel": "2 hours",
          "SafestTimeToVisit": "Daytime or early evening (10 AM - 8 PM)."
        },
        {
          "PlaceName": "Bellagio Fountains Show & Conservatory",
          "PlaceDetails": "Head north towards the heart of the Strip. Visit the Bellagio Conservatory & Botanical Gardens (seasonal displays) and catch the iconic Bellagio Fountains show, which runs frequently in the evening. The area is extremely crowded and well-lit during show times.",
          "PlaceImageUrl": "https://example.com/bellagio_fountains.jpg",
          "GeoCoordinates": {
            "latitude": 36.1127,
            "longitude": -115.1746
          },
          "TicketPricing": "Free",
          "TimeToTravel": "1.5 - 2 hours",
          "SafestTimeToVisit": "Evening during fountain show times (check schedule) - crowds and security make it very safe."
        },
        {
          "PlaceName": "Walk Central Strip (Caesars, Flamingo area)",
          "PlaceDetails": "After the fountains, take a walk along the central Strip. See the exterior of Caesars Palace, The LINQ Promenade (explore if time/energy permits - usually busy), and the Flamingo. Stay on the main well-lit sidewalks with lots of other pedestrians.",
          "PlaceImageUrl": "https://example.com/central_strip_walk.jpg",
          "GeoCoordinates": {
            "latitude": 36.116,
            "longitude": -115.172
          },
          "TicketPricing": "Free",
          "TimeToTravel": "1-2 hours",
          "SafestTimeToVisit": "Early to late evening (7 PM - 11 PM) when lights are on and foot traffic is highest. Be aware of surroundings, especially late."
        }
      ]
    },
    {
      "Day": 2,
      "Plan": "Iconic Strip Sights & Downtown Experience",
      "Activities": [
        {
          "PlaceName": "The Venetian Las Vegas Exploration",
          "PlaceDetails": "Explore the impressive Italian-themed resort. Walk through the Grand Canal Shoppes (window shopping is free!), see the painted sky ceiling, and the outdoor facade. The indoor areas are like a large, safe mall environment.",
          "PlaceImageUrl": "https://example.com/venetian_interior.jpg",
          "GeoCoordinates": {
            "latitude": 36.1210,
            "longitude": -115.1686
          },
          "TicketPricing": "Free (to explore)",
          "TimeToTravel": "2-3 hours",
          "SafestTimeToVisit": "Daytime (10 AM - 5 PM) when stores are open and busy."
        },
        {
          "PlaceName": "Mirage Volcano Show (check schedule!)",
          "PlaceDetails": "If the Volcano show is operational during your visit (check for renovations/schedule changes), it's a free spectacle outside the Mirage. It runs at scheduled times in the evening. The area is crowded and well-lit during the show.",
          "PlaceImageUrl": "https://example.com/mirage_volcano.jpg",
          "GeoCoordinates": {
            "latitude": 36.1203,
            "longitude": -115.1732
          },
          "TicketPricing": "Free",
          "TimeToTravel": "30 minutes (for show)",
          "SafestTimeToVisit": "During scheduled show times in the evening (check schedule) - crowds provide safety."
        },
        {
          "PlaceName": "Fremont Street Experience",
          "PlaceDetails": "Take a ride-share or taxi downtown to the Fremont Street Experience. This pedestrian mall features a massive LED screen canopy ('Viva Vision'), free stage shows, street performers, and historic casinos. Stick to the main canopy area.",
          "PlaceImageUrl": "https://example.com/fremont_street.jpg",
          "GeoCoordinates": {
            "latitude": 36.1695,
            "longitude": -115.1440
          },
          "TicketPricing": "Free (to enter and see shows)",
          "TimeToTravel": "3-4 hours (including travel time)",
          "SafestTimeToVisit": "Evening (7 PM - 12 AM) when the Viva Vision shows are running and the area is packed with people and security. Avoid wandering too far off the main Fremont Street pedestrian mall late at night."
        }
      ]
    },
    {
      "Day": 3,
      "Plan": "North Strip Sight & Departure",
      "Activities": [
        {
          "PlaceName": "Wynn/Encore Esplanade Walk",
          "PlaceDetails": "Visit the luxurious Wynn and Encore resorts on the north Strip. Walk through the public areas, see the unique decor, gardens (Wynn has a nice outdoor area accessible), and high-end shops (window shopping). These resorts are well-maintained and have high security.",
          "PlaceImageUrl": "https://example.com/wynn_gardens.jpg",
          "GeoCoordinates": {
            "latitude": 36.1322,
            "longitude": -115.1641
          },
          "TicketPricing": "Free",
          "TimeToTravel": "1.5 - 2 hours",
          "SafestTimeToVisit": "Morning or early afternoon (10 AM - 3 PM) when the resorts are open and busy."
        },
        {
          "PlaceName": "The Strat Skypod Observation Deck (Optional/Budget Depending)",
          "PlaceDetails": "If your budget allows, consider going up The Strat Tower for panoramic views of the city. Check online for ticket deals or consider if it's included with a show/package. The tower itself is secure.",
          "PlaceImageUrl": "https://example.com/strat_skypod_view.jpg",
          "GeoCoordinates": {
            "latitude": 36.1468,
            "longitude": -115.1553
          },
          "TicketPricing": "$20 - $30+ (Varies, check for deals)",
          "TimeToTravel": "1.5 hours",
          "SafestTimeToVisit": "Daytime for best views (10 AM - 4 PM). Tower is secure regardless of time, but travelling to/from the area is safer earlier."
        },
        {
          "PlaceName": "Last Souvenir Shopping / Revisit Favorite Spot",
          "PlaceDetails": "Depending on departure time, revisit a favorite resort lobby, walk a section of the Strip you enjoyed, or look for affordable souvenirs in gift shops or hotel stores.",
          "PlaceImageUrl": "https://example.com/vegas_souvenir.jpg",
          "GeoCoordinates": {
            "latitude": 36.1147,
            "longitude": -115.1724
          },
          "TicketPricing": "Varies (shopping)",
          "TimeToTravel": "1-2 hours",
          "SafestTimeToVisit": "Daytime (before 4 PM) for easiest access and highest safety."
        },
        {
          "PlaceName": "Departure",
          "PlaceDetails": "Check out of the hotel and head to the airport or your next destination.",
          "PlaceImageUrl": "https://example.com/las_vegas_airport.jpg",
          "GeoCoordinates": {
            "latitude": 36.0840,
            "longitude": -115.1537
          },
          "TicketPricing": "Varies (transportation)",
          "TimeToTravel": "Varies",
          "SafestTimeToVisit": "Daytime is generally easier for transport."
        }
      ]
    }
  ]
}`
        }
      ]
    }
  ]
});