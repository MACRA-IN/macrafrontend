function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-forest/10 p-5 sm:p-6">
      <div className="flex flex-col gap-2.5">
        <div className="h-2.5 w-20 animate-pulse rounded-full bg-forest/20" />
        <div className="h-6 w-52 animate-pulse rounded-full bg-forest/20" />
        <div className="h-2.5 w-36 animate-pulse rounded-full bg-forest/15" />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-20 animate-pulse rounded-2xl bg-forest/20" />
        ))}
      </div>
      <div className="mt-5 flex gap-2.5">
        <div className="h-11 flex-1 animate-pulse rounded-full bg-forest/20" />
        <div className="h-11 flex-1 animate-pulse rounded-full bg-forest/15" />
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="h-7 w-44 animate-pulse rounded-full bg-forest/10" />
      <div className="mt-1.5 h-3.5 w-56 animate-pulse rounded-full bg-forest/5" />
      <div className="mt-6">
        <SkeletonCard />
      </div>
      <div className="mt-5 h-56 animate-pulse rounded-3xl bg-sage/30" />
    </div>
  );
}
