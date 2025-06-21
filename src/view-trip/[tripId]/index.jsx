import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/service/supabaseConfig';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Places from '../components/Places';
import Footer from '../components/Footer';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const { data, error } = await supabase
      .from("AITrips")
      .select("*")
      .eq("id", tripId)
      .single(); // since id is unique

    if (error) {
      console.log("Error fetching trip:", error);
      toast("No trip found!");
    } else {
      console.log("🔍 FULL Trip document:", data);
      console.log("🔍 Trip keys:", Object.keys(data));
      
      // Parse JSON strings if they exist (common in Supabase storage)
      const parsedTrip = {
        ...data,
        userSelection: typeof data.userSelection === 'string' 
          ? JSON.parse(data.userSelection) 
          : data.userSelection,
        tripData: typeof data.tripData === 'string' 
          ? JSON.parse(data.tripData) 
          : data.tripData
      };
      
      console.log("Parsed trip document:", parsedTrip);
      console.log("UserSelection:", parsedTrip.userSelection);
      
      setTrip(parsedTrip);
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommended Hotels Section */}
      <Hotels trip={trip} />
      {/* Daily Plan Itinerary Section */}
      <Places trip={trip} />
      {/* Footer Section */}
      <Footer trip={trip} />
    </div>
  );
}

export default ViewTrip;