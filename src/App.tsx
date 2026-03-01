import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import ProfileSelection from "./pages/ProfileSelection";
import Index from "./pages/Index";
import ShowDetail from "./pages/ShowDetail";
import EpisodeDetail from "./pages/EpisodeDetail";
import StoryChoice from "./pages/StoryChoice";
import CreatorStats from "./pages/CreatorStats";
import CreatorProfile from "./pages/CreatorProfile";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profiles"
            element={
              <RequireAuth>
                <ProfileSelection />
              </RequireAuth>
            }
          />
          <Route
            path="/browse"
            element={
              <RequireAuth>
                <Index />
              </RequireAuth>
            }
          />
          <Route
            path="/show/:id"
            element={
              <RequireAuth>
                <ShowDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/episode/:id"
            element={
              <RequireAuth>
                <EpisodeDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/episode/:id/choice"
            element={
              <RequireAuth>
                <StoryChoice />
              </RequireAuth>
            }
          />
          <Route
            path="/stats"
            element={
              <RequireAuth>
                <CreatorStats />
              </RequireAuth>
            }
          />
          <Route
            path="/creators/:id"
            element={
              <RequireAuth>
                <CreatorProfile />
              </RequireAuth>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
