import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetList,
  SelectTravelList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../service/supabaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [numDays, setNumDays] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedPeopleGroup, setSelectedPeopleGroup] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const accessToken = import.meta.env.VITE_LOCATIONIQ_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Fetch suggestions using LocationIQ
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.locationiq.com/v1/autocomplete?key=${accessToken}&q=${encodeURIComponent(
            query
          )}&limit=5&format=json`
        );

        if (!response.ok) throw new Error("Location fetch error");

        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [query, accessToken]);

  const handleSelect = (place) => {
    setSelectedPlace(place);
    setQuery(place.display_name);
    setSuggestions([]);
    console.log("Selected place:", place.display_name);
  };

  const handleNumDaysChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setNumDays("");
      return;
    }
    if (/^[0-9\b]+$/.test(value)) {
      if (value < 6 && value > 0) {
        setNumDays(value);
        console.log("Number of days:", value);
      } else {
        console.error("Error: Number of days must be between 1 and 5");
      }
    }
  };

  const handleSelectBudget = (item) => {
    setSelectedBudget(item);
    console.log("Selected budget:", item.title);
  };

  const handleSelectPeople = (item) => {
    setSelectedPeopleGroup(item);
    console.log("Selected group:", item.title);
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Supabase OAuth error:", error);
        toast.error("Failed to sign in with Google: " + error.message);
        return;
      }

      console.log("Google OAuth initiated successfully");
    } catch (error) {
      console.error("Error with Google OAuth:", error);
      toast.error("Failed to sign in with Google");
    }
  };

  const onGenerateTrip = async () => {
    if (!user) {
      console.log("User not authenticated, opening dialog");
      setOpenDialog(true);
      return;
    }

    if (!selectedPlace) {
      toast.error("Please select a destination.");
      return;
    }

    if (
      !numDays ||
      isNaN(numDays) ||
      Number(numDays) < 1 ||
      Number(numDays) > 5
    ) {
      toast.error("Please enter a valid number of days between 1 and 5.");
      return;
    }

    if (!selectedBudget) {
      toast.error("Please select your budget.");
      return;
    }

    if (!selectedPeopleGroup) {
      toast.error("Please select your travel group.");
      return;
    }

    const tripFormData = {
      location: selectedPlace,
      noOfDays: Number(numDays),
      budget: selectedBudget,
      traveler: selectedPeopleGroup,
    };

    setLoading(true);

    try {
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        selectedPlace.display_name
      )
        .replace("{totalDays}", numDays)
        .replace("{traveler}", selectedPeopleGroup.title)
        .replace("{budget}", selectedBudget.title)
        .replace("{totalDays}", numDays);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("AI Response:", result?.response?.text());

      await SaveAiTrip(result?.response?.text(), tripFormData);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData, tripFormData) => {
    try {
      if (!user) {
        console.error("No authenticated user");
        toast.error("Authentication required. Please sign in again.");
        setOpenDialog(true);
        return;
      }

      const docId = Date.now().toString();

      let parsedTripData;
      try {
        const jsonMatch = TripData.match(/\{[\s\S]*\}/);
        parsedTripData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

        if (!parsedTripData) {
          console.error("JSON not found in AI response");
          toast.error("Invalid AI response. Please try again.");
          return;
        }

        console.log("Hotels count:", parsedTripData?.hotels?.length);
      } catch (parseError) {
        console.error("Error parsing trip data:", parseError);
        toast.error("Failed to parse trip data");
        return;
      }

      const { data, error } = await supabase.from("AITrips").insert([
        {
          id: docId,
          userEmail: user.email,
          userSelection: tripFormData,
          tripData: parsedTripData,
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        toast.error("Failed to save trip data: " + error.message);
      } else {
        console.log("Trip saved successfully:", data);
        toast.success("Trip generated successfully!");
        navigate(`/view-trip/${docId}`);
      }
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip data");
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);

      if (event === "SIGNED_IN" && session) {
        console.log("User signed in:", session.user);
        setUser(session.user);
        setOpenDialog(false);
        toast.success("Successfully signed in!");
      }

      if (event === "SIGNED_OUT") {
        setUser(null);
        console.log("User signed out");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2
        className="font-bold text-xl md:text-5xl lg:text-5xl leading-tight bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 bg-clip-text text-transparent
    "
      >
        Tell us your travel preferences
      </h2>
      <p className="text-gray-500 mt-3">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      {/* Location */}
      <div className="mt-10">
        <h2 className="text-xl mb-2 font-medium">
          What is your destination of choice?
        </h2>
        <div className="relative mt-3">
          <input
            type="text"
            placeholder="Search a city, e.g. Noida, Las Vegas..."
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none rounded-md px-4 py-3 text-base bg-white text-gray-800 shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((place, index) => (
                <li
                  key={place.place_id || place.osm_id || index}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer text-sm text-gray-700"
                  onClick={() => handleSelect(place)}
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Number of Days */}
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">
          How many days do you plan to travel?
        </h2>
        <Input
          placeholder="Eg. 3"
          value={numDays}
          onChange={handleNumDaysChange}
        />
      </div>

      {/* Budget Selection */}
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">Choose your budget range</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectBudget(item)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                selectedBudget?.id === item.id
                  ? "border-indigo-500 bg-indigo-50"
                  : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* People Group Selection */}
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">
          Who are you traveling with?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectPeople(item)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                selectedPeopleGroup?.id === item.id
                  ? "border-indigo-500 bg-indigo-50"
                  : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="my-10 justify-center flex">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin w-7 h-7" />
          ) : (
            "Generate Trip using AI ⁺₊✧"
          )}
        </Button>
      </div>

      {/* Dialog for user not logged in */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              <div className="text-center">
                <img
                  src="/safaralogo.png"
                  alt="Safari Logo"
                  className="mx-auto mb-4"
                />
                <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
                <p className="mb-4">
                  Sign in with Google authentication to continue.
                </p>
                <Button
                  onClick={signInWithGoogle}
                  className="w-full mt-5 flex gap-4 items-center justify-center"
                >
                  <FcGoogle className="w-7 h-7" /> Sign In with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
