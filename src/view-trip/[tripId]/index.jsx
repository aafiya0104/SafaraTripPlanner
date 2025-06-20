import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/service/supabaseConfig';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Places from '../components/Places';

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
      console.log("Trip document:", data);
      setTrip(data);
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
    </div>
  );
}

export default ViewTrip;
