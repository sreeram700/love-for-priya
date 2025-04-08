
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const loveNotes = [
  "You're the sunshine in my life ☀️",
  "Every heartbeat is for you ❤️",
  "You're my forever and always 💍",
  "With you, every moment is magical ✨",
  "You complete my world 🌍",
  "You're the reason I smile every day 😊",
  "My heart beats only for you 💓",
  "You're my best friend and soulmate 💑",
  "You make life beautiful 💐",
  "I love you more than words can say 💖"
];

const loveTimeline = [
  { date: "Jan 28, 2023", event: "First Message ✉️", note: "The very beginning of something magical. One message changed everything." },
  { date: "Apr 23, 2023", event: "Engaged 💍", note: "With a yes, we sealed our promise of forever." },
  { date: "Apr 27, 2023", event: "Register Marriage 📝", note: "Two souls, one signature. Our love got its wings." },
  { date: "May 18, 2023", event: "I left India ✈️", note: "A tearful goodbye, but our hearts never left each other." },
  { date: "Jul 14, 2023", event: "Married 👰‍♀️🤵‍♂️", note: "We celebrated love, togetherness, and a lifetime to come." },
  { date: "Jul 27, 2023", event: "You came to USA 🌎", note: "Miles disappeared, and our home began to bloom with joy." },
  { date: "Oct 6th, 2023", event: "We became pregnant 🤰", note: "A tiny heartbeat made our hearts race with joy." },
  { date: "Dec 20th, 2023", event: "We had our miscarriage 💔", note: "In pain, we held hands tighter. Love saw us through." },
  { date: "Jan 11th, 2024", event: "We left to India 🌏", note: "In the journey back, we found healing and hope." },
  { date: "Feb 5th, 2024", event: "Pregnant again 🤰✨", note: "Hope returned. A new little miracle growing in love." },
  { date: "Feb 29, 2024", event: "I returned to US, you stayed in India", note: "Even apart, our hearts danced in rhythm." },
  { date: "Apr 15, 2024", event: "I lost my job with Tesla 💼❌", note: "In every fall, your love lifted me higher." },
  { date: "June 15, 2024", event: "Got my job at Zoox 🚗💼", note: "A new beginning, powered by purpose and your belief in me." },
  { date: "July 18, 2024", event: "You returned to US 🛬", note: "Together again, where we belong." },
  { date: "Aug 18, 2024", event: "Anirudh's Concert 🎶", note: "Singing, dancing, hearts beating to the same rhythm." },
  { date: "Oct 06, 2024", event: "Seemantham 💐", note: "Tradition met love, celebrating the life blooming inside you." },
  { date: "Oct 06, 2024", event: "Our Baby Arrived 👶", note: "And then, we became three. The greatest love story ever." },
  { date: "Forever", event: "A Letter From Me to You 💌", note: "Priya, loving you is the greatest blessing of my life. Every moment with you is a gift I cherish. Thank you for being my heart’s home, my partner in every joy and storm, and the most beautiful mother to our child. I will love you more each day — forever and always." }
];

const scenes = [
  {
    title: "Hi.. Priya!",
    subtitle: "Sit back and watch our love story unfold ❤️",
    note: "This is for you. Every heartbeat, every memory, every word. All of it, only for you.",
    bgColor: "bg-gradient-to-br from-rose-700 to-pink-500 text-white"
  },
  ...loveTimeline.map(item => ({
    title: item.date,
    subtitle: item.event,
    note: item.note,
    bgColor: "bg-gradient-to-br from-pink-900 to-red-600 text-white"
  }))
];

export default function LoveForMyWife() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setSceneIndex(prev => (prev + 1) % scenes.length);
      }, 6000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const goToNext = () => {
    setSceneIndex(prev => (prev + 1) % scenes.length);
  };

  const goToPrev = () => {
    setSceneIndex(prev => (prev - 1 + scenes.length) % scenes.length);
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${scenes[sceneIndex].bgColor} flex flex-col items-center justify-center px-4 relative`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
          className="text-center z-20"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{scenes[sceneIndex].title}</h1>
          <p className="text-lg md:text-xl italic mb-4">{scenes[sceneIndex].subtitle}</p>
          <p className="text-md md:text-lg max-w-xl text-white opacity-90 italic">{scenes[sceneIndex].note}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 z-30">
        <button onClick={goToPrev} className="bg-white text-pink-600 px-4 py-2 rounded-xl shadow hover:bg-pink-100">Previous</button>
        <button onClick={() => setIsPaused(!isPaused)} className="bg-white text-pink-600 px-4 py-2 rounded-xl shadow hover:bg-pink-100">
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button onClick={goToNext} className="bg-white text-pink-600 px-4 py-2 rounded-xl shadow hover:bg-pink-100">Next</button>
      </div>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-center z-30">
        <p className="text-sm text-white opacity-80">Scene {sceneIndex + 1} of {scenes.length}</p>
      </div>
    </div>
  );
}
