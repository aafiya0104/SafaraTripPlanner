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
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/safaralogo.png" alt="safaralogo" className="logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.user_metadata?.picture}
                  alt="Profile"
                  className="h-[35px] w-[35px] rounded-full object-cover"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer text-sm"
                  onClick={handleLogout}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Get Started</Button>
        )}
      </div>

      {/* Sign In Dialog */}
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

export default Header;
