import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCard from "./components/UserTripCard";
import { supabase } from "@/service/supabaseConfig";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/");
      return;
    }

    const { data, error } = await supabase
      .from("AITrips")
      .select("*")
      .eq("userEmail", user.email);

    if (error) {
      console.error("Error fetching user trips:", error);
    } else {
      setUserTrips(data);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-xl md:text-5xl lg:text-4xl mb-5 leading-tight bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 bg-clip-text text-transparent">My Trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {userTrips.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripCard key={trip.id || index} trip={trip} />
          ))
        ) : (
          <p className="text-gray-500 italic">No trips found.</p>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
