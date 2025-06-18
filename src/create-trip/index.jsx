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
import { useGoogleLogin } from "@react-oauth/google";
import { supabase } from "./supabaseConfig";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

function CreateTrip() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [numDays, setNumDays] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedPeopleGroup, setSelectedPeopleGroup] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const accessToken = import.meta.env.VITE_LOCATIONIQ_API_KEY;
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

  const login = useGoogleLogin({
    onSuccess: (codeResp) => console.log(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!selectedPlace) {
      toast("Please select a destination.");
      return;
    }

    if (
      !numDays ||
      isNaN(numDays) ||
      Number(numDays) < 1 ||
      Number(numDays) > 5
    ) {
      toast("Please enter a valid number of days between 1 and 5.");
      return;
    }

    if (!selectedBudget) {
      toast("Please select your budget.");
      return;
    }

    if (!selectedPeopleGroup) {
      toast("Please select your travel group.");
      return;
    }

    const formData = {
      location: selectedPlace,
      noOfDays: Number(numDays),
      budget: selectedBudget,
      traveler: selectedPeopleGroup,
    };

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      selectedPlace.display_name
    )
      .replace("{totalDays}", numDays)
      .replace("{traveler}", selectedPeopleGroup.title)
      .replace("{budget}", selectedBudget.title)
      .replace("{totalDays}", numDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    // Note for miu: send this to backend or AI
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    const { data, error } = await supabase.from("AITrips").insert([
      {
        id: docId,
        userselection: formData,
        tripdata: TripData,
        useremail: user?.email,
      },
    ]);
    setLoading(false);
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
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
        <Button onClick={onGenerateTrip}>Generate Trip using AI ⁺₊✧</Button>
      </div>

      {/* Dialog for user not logged in */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/safaralogo.png"></img>
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in with Google authentication.</p>
              <Button
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                {loading?
                "test":
                <>
                  <FcGoogle className="w-7 h-7" /> Sign In with Google
                </>}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
