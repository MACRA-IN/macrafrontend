export default function FinalCTA() {
  return (
    <section className="bg-bg pb-14 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-5 rounded-3xl bg-forest p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-heading text-xl font-bold text-white sm:text-2xl">
              Trial box · 4 bowls · ₹399
            </p>
            <p className="mt-2 text-sm text-emerald">
              + free delivery · cancel anytime · limited founding spots
            </p>
          </div>
          <button className="w-full shrink-0 rounded-full bg-emerald px-8 py-4 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark sm:w-auto">
            Preorder now →
          </button>
        </div>
      </div>
    </section>
  );
}
