import { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TherapySession from "./components/TherapySession";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    // Initialize audio assets
    const initAudio = async () => {
      try {
        const bgMusic = new Audio('/sounds/background.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
        setBackgroundMusic(bgMusic);

        const hitSound = new Audio('/sounds/hit.mp3');
        setHitSound(hitSound);

        const successSound = new Audio('/sounds/success.mp3');
        setSuccessSound(successSound);

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize audio:', error);
        setIsLoading(false);
      }
    };

    initAudio();
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading VR Therapy Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen overflow-hidden bg-gray-900">
        <Suspense fallback={
          <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Initializing therapy session...</p>
            </div>
          </div>
        }>
          <TherapySession />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
}

export default App;
