"use client";

import confetti from "canvas-confetti";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import childhood1 from "@/assets/images/childhood_1.jpg";
import childhood2 from "@/assets/images/childhood_2.jpg";
import childhood3 from "@/assets/images/childhood_3.jpg";
import holdingHands from "@/assets/images/holdinghands.jpg";
import bestPhoto from "@/assets/images/IMG_4286.jpg";
import us from "@/assets/images/us.jpeg";
import us2 from "@/assets/images/us_2.jpeg";
import vc from "@/assets/images/vc.png";
import vc1 from "@/assets/images/vc_1.png";

type Photo = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

const talkingStartedAt = new Date("2024-06-03T00:00:00+05:30");
const loveVideo = "/video1.mp4";

const storyPhotos: Photo[] = [
  {
    src: us,
    alt: "Lakshu and Ankit together",
    caption: "The first kind of magic I never wanted to end.",
  },
  {
    src: holdingHands,
    alt: "Ankit and Lakshu holding hands",
    caption: "A quiet promise, held without saying too much.",
  },
  {
    src: us2,
    alt: "A warm memory of Lakshu and Ankit",
    caption: "Two days. A lifetime of feeling in between.",
  },
];

const childhoodPhotos: Photo[] = [
  { src: childhood1, alt: "Lakshu childhood memory one" },
  { src: childhood2, alt: "Lakshu childhood memory two" },
  { src: childhood3, alt: "Lakshu childhood memory three" },
];

const callMemories: Photo[] = [
  {
    src: vc,
    alt: "Video call memory with Lakshu",
    caption: "Distance never stopped us from finding comfort in each other.",
  },
  {
    src: vc1,
    alt: "Another video call memory with Lakshu",
    caption: "Even through a screen, you felt close enough to calm my world.",
  },
];

const reasons = [
  {
    title: "Your smile",
    body: "It has this soft way of making everything around me feel lighter, like the day quietly got better just because you are in it.",
  },
  {
    title: "The way you care",
    body: "You notice the little things. You remember feelings. You make love feel gentle, thoughtful, and real.",
  },
  {
    title: "The way you calm me",
    body: "When my mind gets loud, you somehow become the quiet place I want to come back to.",
  },
  {
    title: "Ordinary days",
    body: "With you, even the smallest moments feel worth keeping. You make normal life feel like a memory in the making.",
  },
];

const letters = [
  {
    title: "Open when you miss me",
    body: "Close your eyes for a second and imagine my hand finding yours. I am not as far as the distance makes it feel. I am in the songs, the calls, the silly memories, and in every little thought that comes back to you softly. I miss you too, Lakshu. Always more than I say.",
  },
  {
    title: "Open when you feel sad",
    body: "My love, you do not have to be strong every minute. Let the day be heavy if it needs to be. I would still choose you on your quiet days, your tired days, your confused days. Nothing about sadness makes you less lovable to me.",
  },
  {
    title: "Open when you overthink",
    body: "Breathe. You are not too much. You are not hard to love. You are not a problem I am solving; you are a person I feel lucky to understand. If your mind creates a hundred doubts, let this be the answer: I am here, and I mean us.",
  },
  {
    title: "Open when you need reassurance",
    body: "I choose you in the simple ways and the serious ways. I choose your laugh, your heart, your softness, your storms, your dreams. No matter what changes around us, my feelings for you are not a passing moment. They are home.",
  },
];

const birthdayWishes = [
  "I hope this year gives you the kind of peace you quietly deserve.",
  "I hope you laugh more freely, sleep more softly, and feel loved without asking.",
  "I hope every dream you are scared to say out loud finds its way closer to you.",
  "I hope you always remember that there is someone who sees you as a blessing.",
  "I hope life becomes gentle with you in all the places it has been hard.",
];

const promises = [
  {
    title: "I promise to listen",
    body: "Not just to your words, but to the pauses, the tiredness, and the feelings you do not always know how to explain.",
  },
  {
    title: "I promise to choose you gently",
    body: "On easy days and complicated days, in little conversations and big moments, I want to keep choosing us with care.",
  },
  {
    title: "I promise to make you feel safe",
    body: "Safe to laugh, safe to cry, safe to be soft, safe to be fully yourself without feeling like you need to hide any part of you.",
  },
];

function revealVariant(delay = 0) {
  return {
    initial: { opacity: 0, y: 36, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  };
}

export default function BirthdayExperience() {
  const [loading, setLoading] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [selectedReason, setSelectedReason] = useState(0);
  const [selectedWish, setSelectedWish] = useState(0);
  const [openLetter, setOpenLetter] = useState<number | null>(null);
  const [surprise, setSurprise] = useState(false);
  const [activeCall, setActiveCall] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 180, damping: 28 });
  const smoothY = useSpring(cursorY, { stiffness: 180, damping: 28 });

  const daysTalking = useMemo(() => {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const difference = startOfToday.getTime() - talkingStartedAt.getTime();
    return Math.max(1, Math.floor(difference / 86_400_000));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.72 },
        colors: ["#ff7ab6", "#f9a8d4", "#c084fc", "#ffffff"],
      });
    }, 1700);

    const moveCursor = (event: PointerEvent) => {
      cursorX.set(event.clientX - 140);
      cursorY.set(event.clientY - 140);
    };

    window.addEventListener("pointermove", moveCursor);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", moveCursor);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.volume = 0.45;
      audioRef.current.play().catch(() => setMusicOn(false));
    } else {
      audioRef.current.pause();
    }
  }, [musicOn]);

  const startJourney = () => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  };

  const openSurprise = () => {
    setSurprise(true);
    confetti({
      particleCount: 180,
      spread: 120,
      startVelocity: 32,
      colors: ["#fb7185", "#f0abfc", "#c4b5fd", "#ffffff"],
      origin: { y: 0.62 },
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050207] text-white selection:bg-pink-300 selection:text-black">
      <audio ref={audioRef} src={loveVideo} loop preload="metadata" />

      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-[#050207]"
            exit={{ opacity: 0, filter: "blur(16px)" }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="px-8 text-center text-lg font-medium tracking-wide text-pink-100"
              animate={{ opacity: [0.45, 1, 0.45], y: [8, 0, 8] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              Preparing something special for Lakshu...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none fixed z-40 hidden h-72 w-72 rounded-full bg-pink-400/18 blur-3xl md:block"
        style={{ x: smoothX, y: smoothY }}
      />

      <FloatingParticles />
      <MusicButton musicOn={musicOn} onClick={() => setMusicOn((value) => !value)} />

      <Hero onStart={startJourney} />
      <StorySection />
      <ChildhoodSection />
      <CallsSection activeCall={activeCall} setActiveCall={setActiveCall} />
      <WishJarSection selectedWish={selectedWish} setSelectedWish={setSelectedWish} />
      <ReasonsSection selected={selectedReason} setSelected={setSelectedReason} />
      <LettersSection openLetter={openLetter} setOpenLetter={setOpenLetter} />
      <MemoryCounter daysTalking={daysTalking} />
      <PromisesSection />
      <VideoSection />
      <SurpriseSection onOpen={openSurprise} />
      <EndingSection />

      <AnimatePresence>
        {surprise && <SurpriseOverlay onClose={() => setSurprise(false)} />}
      </AnimatePresence>
    </main>
  );
}

function MusicButton({
  musicOn,
  onClick,
}: {
  musicOn: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      className="fixed right-4 top-4 z-30 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-pink-50 shadow-[0_0_35px_rgba(236,72,153,0.25)] backdrop-blur-xl"
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.03, boxShadow: "0 0 38px rgba(244,114,182,0.42)" }}
      onClick={onClick}
      aria-label={musicOn ? "Turn music off" : "Turn music on"}
    >
      {musicOn ? "Music on" : "Music off"}
    </motion.button>
  );
}

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: index,
        left: `${(index * 29) % 100}%`,
        delay: (index % 9) * 0.42,
        duration: 7 + (index % 8),
        size: 3 + (index % 4),
        symbol: index % 5 === 0 ? "heart" : "star",
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute bottom-[-8vh] rounded-full"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            background:
              particle.symbol === "heart"
                ? "rgba(244,114,182,0.72)"
                : "rgba(255,255,255,0.72)",
            boxShadow: "0 0 18px rgba(244,114,182,0.65)",
          }}
          animate={{
            y: ["0vh", "-112vh"],
            x: [0, particle.id % 2 ? 24 : -24, 0],
            opacity: [0, 0.9, 0],
            scale: [0.5, 1.15, 0.7],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Hero({ onStart }: { onStart: () => void }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={heroRef}
      className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 py-24"
    >
      <motion.div className="absolute inset-0 opacity-60" style={{ y }}>
        <Image
          src={holdingHands}
          alt="Lakshu and Ankit holding hands"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-58"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(236,72,153,0.22),transparent_34%),linear-gradient(180deg,rgba(5,2,7,0.12),rgba(5,2,7,0.5)_56%,#050207_95%)]" />
      </motion.div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.p
          className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-pink-200/80"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.7 }}
        >
          A birthday love letter
        </motion.p>
        <motion.h1
          className="text-balance text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-7xl"
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Happy Birthday,{" "}
          <span className="bg-gradient-to-r from-pink-200 via-fuchsia-200 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(244,114,182,0.42)]">
            Lakshu ❤️
          </span>
        </motion.h1>
        <motion.p
          className="mt-6 max-w-md text-pretty text-base leading-8 text-pink-50/78 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.28, duration: 0.8 }}
        >
          A small corner of the internet made only for you.
        </motion.p>
        <motion.button
          className="mt-10 rounded-full border border-pink-200/30 bg-pink-200 px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#190512] shadow-[0_0_45px_rgba(244,114,182,0.38)]"
          onClick={onStart}
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -3, boxShadow: "0 0 55px rgba(244,114,182,0.58)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.55, duration: 0.7 }}
        >
          Start the Journey
        </motion.button>
      </div>
    </section>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div {...revealVariant()} className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-pink-200/70">
            {eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <SectionShell id="story" eyebrow="" title="Two days that stayed in my heart.">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <motion.div
          {...revealVariant(0.08)}
          className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-lg leading-9 text-pink-50/82 shadow-[0_0_60px_rgba(168,85,247,0.12)] backdrop-blur-xl lg:sticky lg:top-8"
        >
          <p>I never knew two days could create memories this beautiful.</p>
          <p className="mt-5">
            Some people slowly become special. You somehow became home instantly.
          </p>
          <p className="mt-5">
            At first, I was nervous. My heart was louder than my words, but
            somehow that nervousness became one of the best feelings I have
            ever felt.
          </p>
          <p className="mt-5">
            That first hug, the way you brought ice cream for me, holding your
            hand for the first time, buying roses for you, walking beside you
            with our hands together; I loved every single millisecond of our
            time together.
          </p>
        </motion.div>

        <div className="space-y-7">
          {storyPhotos.map((photo, index) => (
            <motion.article
              key={photo.alt}
              {...revealVariant(index * 0.1)}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.07] shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 680px, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-pretty text-lg font-medium leading-7 text-white">
                  {photo.caption}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function ChildhoodSection() {
  return (
    <SectionShell
      eyebrow=""
      title="The little girl in these pictures grew into the most beautiful person I know."
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {childhoodPhotos.map((photo, index) => (
          <motion.div
            key={photo.alt}
            {...revealVariant(index * 0.08)}
            whileHover={{ y: -10, rotate: index % 2 ? 2 : -2 }}
            className="rounded-[1.4rem] border border-pink-100/18 bg-pink-50/90 p-3 shadow-[0_0_44px_rgba(244,114,182,0.2)]"
          >
            <div className="relative aspect-[3/4.5] overflow-hidden rounded-[1rem]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <p className="px-2 pb-2 pt-4 text-center font-serif text-lg text-[#28101f]">
              Lakshu Don
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function CallsSection({
  activeCall,
  setActiveCall,
}: {
  activeCall: number;
  setActiveCall: (index: number) => void;
}) {
  const photo = callMemories[activeCall];

  return (
    <SectionShell eyebrow="" title="Even distance became softer with you.">
      <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <motion.div
          {...revealVariant()}
          className="relative mx-auto w-full max-w-sm rounded-[2rem] border border-white/12 bg-white/[0.07] p-3 shadow-[0_0_70px_rgba(192,132,252,0.18)] backdrop-blur-xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={photo.alt}
              className="relative aspect-[9/19.5] overflow-hidden rounded-[1.55rem]"
              initial={{ opacity: 0, x: 32, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -32, scale: 0.97 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="360px"
                className="object-cover"
                placeholder="blur"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div {...revealVariant(0.1)} className="space-y-5 text-center lg:text-left">
          <p className="text-pretty text-2xl font-semibold leading-9 text-pink-50">
            {photo.caption}
          </p>
          <div className="flex justify-center gap-3 lg:justify-start">
            {callMemories.map((item, index) => (
              <button
                key={item.alt}
                onClick={() => setActiveCall(index)}
                className={`h-3 rounded-full transition-all ${
                  activeCall === index
                    ? "w-10 bg-pink-200 shadow-[0_0_18px_rgba(244,114,182,0.7)]"
                    : "w-3 bg-white/25"
                }`}
                aria-label={`Show video call memory ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}

function WishJarSection({
  selectedWish,
  setSelectedWish,
}: {
  selectedWish: number;
  setSelectedWish: (index: number) => void;
}) {
  const nextWish = () => {
    setSelectedWish((selectedWish + 1) % birthdayWishes.length);
    confetti({
      particleCount: 45,
      spread: 58,
      startVelocity: 18,
      origin: { y: 0.78 },
      colors: ["#f9a8d4", "#f0abfc", "#c4b5fd", "#ffffff"],
    });
  };

  return (
    <SectionShell
      eyebrow=""
      title="Tiny wishes I am keeping for your new year."
    >
      <motion.div
        {...revealVariant()}
        className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.07] px-5 py-8 text-center shadow-[0_0_70px_rgba(244,114,182,0.16)] backdrop-blur-xl sm:px-10 sm:py-12"
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-pink-200/70 to-transparent" />
        <motion.div
          className="mx-auto mb-7 grid h-24 w-24 place-items-center rounded-full border border-pink-100/20 bg-pink-200/10 text-4xl shadow-[0_0_44px_rgba(244,114,182,0.22)]"
          animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ♡
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={birthdayWishes[selectedWish]}
            className="mx-auto min-h-36 max-w-2xl text-balance text-2xl font-semibold leading-10 text-pink-50 sm:text-4xl sm:leading-[1.25]"
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
          >
            {birthdayWishes[selectedWish]}
          </motion.p>
        </AnimatePresence>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.button
            onClick={nextWish}
            whileHover={{ y: -3, boxShadow: "0 0 38px rgba(244,114,182,0.36)" }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-pink-200 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#190512]"
          >
            Pull another wish
          </motion.button>
          <p className="text-sm text-pink-100/58">
            {selectedWish + 1} of {birthdayWishes.length}
          </p>
        </div>
      </motion.div>
    </SectionShell>
  );
}

function ReasonsSection({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (index: number) => void;
}) {
  return (
    <SectionShell eyebrow="Reasons why I love you" title="Tiny reasons. Huge feelings.">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid grid-cols-2 gap-3">
          {reasons.map((reason, index) => (
            <motion.button
              key={reason.title}
              {...revealVariant(index * 0.06)}
              onClick={() => setSelected(index)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -5 }}
              className={`min-h-32 rounded-[1.4rem] border p-4 text-left text-sm font-semibold leading-6 transition-all ${
                selected === index
                  ? "border-pink-200/60 bg-pink-300/18 text-white shadow-[0_0_45px_rgba(244,114,182,0.28)]"
                  : "border-white/10 bg-white/[0.06] text-pink-50/78"
              }`}
            >
              {reason.title}
            </motion.button>
          ))}
        </div>
        <motion.div
          layout
          className="rounded-[1.7rem] border border-white/12 bg-white/[0.07] p-7 shadow-[0_0_60px_rgba(168,85,247,0.16)] backdrop-blur-xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={reasons[selected].title}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.42 }}
            >
              <h3 className="text-2xl font-semibold text-pink-100">{reasons[selected].title}</h3>
              <p className="mt-5 text-lg leading-9 text-pink-50/82">{reasons[selected].body}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionShell>
  );
}

function LettersSection({
  openLetter,
  setOpenLetter,
}: {
  openLetter: number | null;
  setOpenLetter: (index: number | null) => void;
}) {
  return (
    <SectionShell eyebrow="Open when..." title="A few letters for the moments I cannot be next to you.">
      <div className="grid gap-4 sm:grid-cols-2">
        {letters.map((letter, index) => {
          const isOpen = openLetter === index;
          return (
            <motion.button
              key={letter.title}
              {...revealVariant(index * 0.08)}
              onClick={() => setOpenLetter(isOpen ? null : index)}
              className="group min-h-56 overflow-hidden rounded-[1.55rem] border border-white/12 bg-white/[0.07] p-5 text-left shadow-[0_0_50px_rgba(236,72,153,0.13)] backdrop-blur-xl"
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-white">{letter.title}</h3>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pink-200/15 text-pink-100">
                  {isOpen ? "Read" : "Open"}
                </span>
              </div>
              <div className="mt-5 h-px bg-gradient-to-r from-transparent via-pink-200/40 to-transparent" />
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.p
                    className="mt-5 text-base leading-8 text-pink-50/84"
                    initial={{ opacity: 0, height: 0, y: 18 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 18 }}
                    transition={{ duration: 0.45 }}
                  >
                    {letter.body}
                  </motion.p>
                ) : (
                  <motion.p
                    className="mt-8 text-sm uppercase tracking-[0.24em] text-pink-100/54"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Tap to unfold
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </SectionShell>
  );
}

function MemoryCounter({ daysTalking }: { daysTalking: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const totalFrames = 90;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(daysTalking * eased));

      if (progress === 1) {
        window.clearInterval(timer);
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, [daysTalking, inView]);

  return (
    <section ref={ref} className="relative z-10 px-5 py-20 text-center">
      <motion.div
        {...revealVariant()}
        className="mx-auto max-w-xl rounded-[2rem] border border-pink-100/14 bg-white/[0.07] px-6 py-12 shadow-[0_0_70px_rgba(244,114,182,0.16)] backdrop-blur-xl"
      >
        <motion.div
          className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-pink-300/18 text-4xl shadow-[0_0_40px_rgba(244,114,182,0.35)]"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        >
          ❤️
        </motion.div>
        <p className="text-6xl font-semibold text-white">{display}</p>
        <p className="mt-4 text-lg font-medium text-pink-50/78">
          days since we started talking ❤️
        </p>
      </motion.div>
    </section>
  );
}

function PromisesSection() {
  return (
    <SectionShell eyebrow="Promises" title="A few things I want to keep giving you.">
      <div className="grid gap-4 md:grid-cols-3">
        {promises.map((promise, index) => (
          <motion.article
            key={promise.title}
            {...revealVariant(index * 0.08)}
            whileHover={{ y: -7 }}
            className="rounded-[1.6rem] border border-white/12 bg-white/[0.07] p-6 shadow-[0_0_55px_rgba(168,85,247,0.12)] backdrop-blur-xl"
          >
            <div className="mb-6 h-px w-16 bg-pink-200/60" />
            <h3 className="text-2xl font-semibold leading-8 text-white">{promise.title}</h3>
            <p className="mt-5 text-base leading-8 text-pink-50/78">{promise.body}</p>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}

function VideoSection() {
  return (
    <SectionShell eyebrow="A song, a memory" title="The video that already knows what my heart means.">
      <motion.div
        {...revealVariant()}
        className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-3 shadow-[0_0_70px_rgba(168,85,247,0.16)] backdrop-blur-xl"
      >
        <video
          className="aspect-[9/16] w-full rounded-[1.35rem] object-cover sm:aspect-video"
          src={loveVideo}
          controls
          preload="metadata"
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </SectionShell>
  );
}

function SurpriseSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="relative z-10 px-5 py-20 text-center">
      <motion.button
        {...revealVariant()}
        onClick={onOpen}
        whileHover={{ scale: 1.04, boxShadow: "0 0 55px rgba(244,114,182,0.45)" }}
        whileTap={{ scale: 0.95 }}
        className="rounded-full border border-white/12 bg-white/[0.08] px-8 py-5 text-sm font-bold uppercase tracking-[0.22em] text-pink-50 backdrop-blur-xl"
      >
        Do not click 👀
      </motion.button>
    </section>
  );
}

function SurpriseOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-[#050207]/96 px-6 text-center backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, filter: "blur(14px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        exit={{ scale: 0.94, opacity: 0, filter: "blur(12px)" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl">
          Thank you for existing.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-xl leading-9 text-pink-50/84">
          You are the best thing that ever happened to me.
        </p>
        <button
          onClick={onClose}
          className="mt-10 rounded-full bg-pink-200 px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#190512]"
        >
          Come back
        </button>
      </motion.div>
    </motion.div>
  );
}

function EndingSection() {
  return (
    <section className="relative z-10 min-h-[100svh] px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div {...revealVariant()} className="order-2 lg:order-1">
          <TypewriterMessage />
          <p className="mt-10 text-2xl font-semibold text-pink-100">Forever yours, Ankit ❤️</p>
        </motion.div>
        <motion.div
          {...revealVariant(0.12)}
          className="order-1 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.07] p-3 shadow-[0_0_70px_rgba(244,114,182,0.16)] backdrop-blur-xl lg:order-2"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
            <Image
              src={bestPhoto}
              alt="Lakshu and Ankit best memory"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
            <motion.p
              className="absolute bottom-5 left-5 right-5 text-pretty text-lg font-medium leading-7 text-pink-50"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              If I could gift you one thing forever, it would be the feeling of
              never doubting how loved you are.
            </motion.p>
          </div>
        </motion.div>
      </div>
      <motion.div
        {...revealVariant(0.18)}
        className="mx-auto mt-10 max-w-3xl rounded-[1.6rem] border border-pink-100/12 bg-pink-100/[0.06] p-6 text-center shadow-[0_0_55px_rgba(244,114,182,0.12)] backdrop-blur-xl"
      >
        <p className="text-pretty text-lg leading-9 text-pink-50/82">
          Lakshu, this is not just a website. It is a little proof that
          I remember you with warmth, prays for your happiness, and cherish you with all my heart. I am grateful for every moment we have shared, and I
          feel lucky that life somehow led me to you.
        </p>
      </motion.div>
    </section>
  );
}

function TypewriterMessage() {
  const message =
    "No matter how many birthdays come, I just want to be there for all of them with you.";
  const [text, setText] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setText(message.slice(0, index));
      if (index >= message.length) window.clearInterval(timer);
    }, 42);
    return () => window.clearInterval(timer);
  }, [inView]);

  return (
    <h2
      ref={ref}
      className="min-h-56 text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl"
    >
      {text}
      <motion.span
        className="ml-1 inline-block h-9 w-0.5 translate-y-1 bg-pink-200 sm:h-12"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </h2>
  );
}
