import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/service/supabaseConfig";
import { toast } from "sonner";

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
        }
        if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/");
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      toast.error("Failed to sign in with Google: " + error.message);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        >
          <img 
            src="/safaralogo.png" 
            alt="Safara Logo" 
            className="h-10 w-auto object-contain"
          />
          <div className="ml-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-800 bg-clip-text text-transparent">
              Safara
            </h1>
            <p className="text-xs text-amber-700/70 font-medium">Your Travel Planner</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <a href='/create-trip'>
                <Button 
                  variant='outline'
                  className='rounded-full border-2 border-amber-300 text-amber-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 hover:border-amber-400 transition-all duration-300 font-medium px-6 shadow-sm hover:shadow-md'
                >
                  ✨ Create Trip
                </Button>
              </a>
              
              <a href="/my-trips">
                <Button 
                  variant="outline" 
                  className="rounded-full border-2 border-amber-300 text-amber-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 hover:border-amber-400 transition-all duration-300 font-medium px-6 shadow-sm hover:shadow-md"
                >
                  🗂️ My Trips
                </Button>
              </a>

              <Popover>
                <PopoverTrigger>
                  <div className="relative group cursor-pointer">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                    <img
                      src={user?.user_metadata?.picture}
                      alt="Profile"
                      className="relative h-11 w-11 rounded-full object-cover border-2 border-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-55 p-0 bg-white/95 backdrop-blur-md border border-amber-200 shadow-xl rounded-xl">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-amber-100">
                      <img
                        src={user?.user_metadata?.picture}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{user?.user_metadata?.name}</p>
                        <p className="text-xs text-amber-600">{user?.email}</p>
                      </div>
                    </div>
                    <button 
                      className="w-full text-left text-sm text-amber-700 hover:text-amber-800 hover:bg-amber-50 px-2 py-2 rounded-lg transition-all duration-200 font-medium"
                      onClick={handleLogout}
                    >
                      👋 Sign Out
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button 
              onClick={() => setOpenDialog(true)}
              className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-800 text-white rounded-full px-8 py-2.5 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
            >
              ✨ Get Started
            </Button>
          )}
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl">
          <DialogHeader className="text-center space-y-4">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-800 bg-clip-text text-transparent">
              Welcome to Safara
            </DialogTitle>
            <DialogDescription asChild>
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full blur opacity-20"></div>
                    <img
                      src="/safaralogo.png"
                      alt="Safara Logo"
                      className="relative h-16 w-auto object-contain"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                     Safe Travel Planning for Everyone
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Join thousands of travelers who trust Safara for secure, 
                    personalized trip planning with AI-powered safety insights.
                  </p>
                </div>

                <Button
                  onClick={signInWithGoogle}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 rounded-xl py-3 px-6 font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <FcGoogle className="w-6 h-6" /> 
                  Continue with Google
                </Button>
                
                <p className="text-xs text-gray-500 mt-4">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;