import React, { useState } from "react";
import { MapPin, Rocket, PauseCircle, Check, X } from "lucide-react";
import WaitlistScreen from "../../components/buyFlow/WaitlistScreen";
import { checkDeliveryArea, joinWaitlist } from "../../services/locationService";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4 sm:size-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const milestones = [
  { title: "Planning & Design", status: "Completed", done: true },
  { title: "Technology & Backend", status: "Completed", done: true },
  { title: "New Kitchen Setup", status: "In Progress", active: true },
  { title: "Pilot Launch", status: "Coming Next" },
  { title: "Hyderabad Launch", status: "Coming Soon" },
];

export default function ComingSoon() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [locationCheckId, setLocationCheckId] = useState(null);
  const [locating, setLocating] = useState(false);

  const handleOpenWaitlist = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await checkDeliveryArea(pos.coords.latitude, pos.coords.longitude);
          const id = res?.data?.location_check_id ?? null;
          setLocationCheckId(id);
        } catch {
          setLocationCheckId(null);
        }
        setLocating(false);
        setShowWaitlist(true);
      },
      () => { setLocating(false); setShowWaitlist(true); }
    );
  };

  const handleJoinWaitlist = async () => {
    await joinWaitlist(locationCheckId);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#FFFAFC] text-[#28172F]">

      <div className="pointer-events-none fixed -right-40 top-20 h-96 w-96 rounded-full bg-pink-200/40 blur-[100px]" />
      <div className="pointer-events-none fixed -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-200/40 blur-[100px]" />

      <div className="relative mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-7 md:px-12 lg:px-16">

        {/* NAVBAR */}
        <nav className="mb-6 flex items-center justify-between sm:mb-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#FF2B85] sm:text-4xl">
            Macra<span className="text-[10px] align-top sm:text-xs">®</span>
          </h2>
          <div className="flex items-center gap-1.5 rounded-full border border-pink-100 bg-white px-3 py-1.5 text-[11px] font-semibold shadow-sm sm:gap-2 sm:px-4 sm:py-3 sm:text-sm">
            <MapPin size={13} className="text-[#FF2B85] sm:size-[17px]" />
            Hyderabad · Selected Areas
          </div>
        </nav>

        {/* HERO */}
        <section className="grid items-center gap-6 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT */}
          <div className="animate-[fadeIn_.8s_ease-out]">
            {/* badge — hidden on mobile */}
            <div className="mb-6 hidden items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-5 py-2 text-sm font-bold text-purple-800 sm:inline-flex">
              <Rocket size={16} className="text-[#FF2B85]" />
              A New Chapter for Macra
            </div>

            <h1 className="text-[1.6rem] font-extrabold leading-[1.15] tracking-[-1px] sm:text-5xl sm:tracking-[-2px] xl:text-[56px]">
              We're Pausing
              <br />
              Online Orders to
              <br />
              <span className="bg-gradient-to-r from-[#FF2B85] to-purple-700 bg-clip-text text-transparent">
                Open a New Kitchen!
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-xs leading-6 text-gray-600 sm:mt-7 sm:text-base sm:leading-8 md:text-lg">
              We're setting up our new kitchen, upgrading our technology and
              preparing our operations to serve you fresher, healthier and even
              better meals.
            </p>

            {/* everything below hidden on all screens */}
            <div className="hidden">
              <div className="mt-8 flex gap-4 rounded-2xl border border-pink-200 bg-pink-50 p-5">
                <PauseCircle className="mt-1 shrink-0 text-[#FF2B85]" size={28} />
                <div>
                  <h3 className="font-bold text-[#D91470]">Online Orders Temporarily Paused</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    We're preparing our new kitchen. Ordering will resume once everything is ready!
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-4 gap-3">
                {[
                  ["🌿", "Fresh", "Ingredients"],
                  ["💪", "High", "Protein"],
                  ["💗", "Balanced", "Nutrition"],
                  ["🥗", "Healthy", "Meals"],
                ].map(([icon, title, sub]) => (
                  <div key={title} className="rounded-2xl border border-pink-100 bg-white/80 p-4 text-center shadow-sm transition hover:-translate-y-1">
                    <div className="text-2xl">{icon}</div>
                    <p className="mt-2 text-sm font-bold">{title}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <h3 className="flex items-center gap-3 text-2xl font-extrabold text-purple-800">
                  <Rocket className="text-[#FF2B85]" />
                  We'll Be Back Soon!
                </h3>
                <p className="mt-2 text-sm text-gray-500">Thank you for being part of the Macra journey. ❤️</p>
              </div>

              <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#D91470]">
                <MapPin size={18} />
                Stay tuned for our launch in selected areas of Hyderabad.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative w-full">
            <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-br from-pink-200 to-purple-200 opacity-50 blur-2xl" />
            <div className="relative aspect-[1.22/1] overflow-hidden rounded-[16px] border-4 border-white shadow-2xl sm:rounded-[28px] sm:border-[7px]">
              <img
                src="/images/macra-launch.png"
                alt="Macra team preparing for its new kitchen launch"
                className="h-full w-full object-cover object-right"
              />
            </div>
          </div>
        </section>

        {/* WAITLIST BUTTON */}
        <button
          onClick={handleOpenWaitlist}
          disabled={locating}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF2B85] py-4 text-sm font-extrabold text-white transition-all hover:bg-[#e0246f] active:scale-[0.98] disabled:opacity-70 sm:mt-6 sm:text-base"
        >
          {locating && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
          {locating ? "Getting location..." : "Join the Waitlist"}
        </button>

        {/* WAITLIST MODAL */}
        {showWaitlist && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
            <div className="relative w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
              <button
                onClick={() => setShowWaitlist(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <X size={16} />
              </button>
              <WaitlistScreen
                areaName="your area"
                onJoinWaitlist={handleJoinWaitlist}
                onSearchArea={() => setShowWaitlist(false)}
                onBackHome={() => setShowWaitlist(false)}
              />
            </div>
          </div>
        )}

        {/* INSTAGRAM CTA — prominent on mobile, normal on desktop */}
        <a
          href="https://www.instagram.com/trymacra/"
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex w-full items-center gap-3 rounded-2xl border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-4 shadow-sm transition hover:shadow-md active:scale-[0.98] sm:mt-10 sm:px-6 sm:py-5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF2B85] to-purple-600 text-white sm:h-12 sm:w-12">
            <InstagramIcon />
          </div>
          <div className="text-left">
            <p className="text-sm font-extrabold text-[#28172F] sm:text-base">Follow our journey on Instagram</p>
            <p className="mt-0.5 text-xs text-gray-500">@trymacra · Updates, behind the scenes & launch news</p>
          </div>
          <span className="ml-auto text-base font-bold text-[#FF2B85]">↗</span>
        </a>

        {/* MILESTONES — hidden on all screens */}
        <section className="mt-28 hidden">
          <div className="text-center">
            <p className="text-xs font-extrabold tracking-[3px] text-[#FF2B85]">OUR JOURNEY</p>
            <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
              Building something better, step by step.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {milestones.map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl border p-5 text-center ${
                  item.active
                    ? "border-pink-300 bg-pink-50 shadow-lg shadow-pink-100"
                    : "border-pink-100 bg-white"
                }`}
              >
                <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full ${
                  item.done ? "bg-purple-800 text-white"
                  : item.active ? "bg-[#FF2B85] text-white"
                  : "bg-purple-50 text-purple-700"
                }`}>
                  {item.done ? <Check size={20} /> : <Rocket size={19} />}
                </div>
                <h3 className="mt-4 text-sm font-bold">{item.title}</h3>
                <p className={`mt-2 text-xs font-semibold ${item.active ? "text-[#FF2B85]" : "text-gray-500"}`}>
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-pink-100 py-5 text-center sm:mt-20 sm:flex-row sm:gap-4 sm:py-8">
          <span className="text-lg font-extrabold text-[#FF2B85] sm:text-2xl">Macra.</span>
          <p className="text-[11px] text-gray-500 sm:text-sm">© 2025 June Labs Private Limited</p>
          <a
            href="https://www.instagram.com/trymacra/"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-bold text-[#FF2B85] hover:underline sm:text-sm"
          >
            @trymacra on Instagram ↗
          </a>
        </footer>

      </div>
    </main>
  );
}
