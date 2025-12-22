import React from "react";

const CheckIcon = () => (
  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 mr-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3 w-3 text-emerald-400"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-7.25 9a.75.75 0 0 1-1.127.02l-3.25-3.5A.75.75 0 0 1 6.03 9.47l2.692 2.899 6.71-8.336a.75.75 0 0 1 1.272.12Z"
        clipRule="evenodd"
      />
    </svg>
  </span>
);

const UserPlans = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center px-4 py-16">
      <div className="relative w-full max-w-6xl">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-16 mx-auto h-64 max-w-4xl rounded-full bg-emerald-500/20 blur-3xl opacity-60" />
          <div className="absolute inset-x-0 bottom-0 mx-auto h-72 max-w-5xl bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] text-emerald-300/80 uppercase mb-3">
            pricing
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Your Plan, Your Way
          </h1>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
            Manage, track, and optimize your digital assets with a plan built for your
            needs.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center rounded-full bg-white/5 p-1 ring-1 ring-white/10 text-xs md:text-sm">
            <button className="px-4 py-1.5 rounded-full bg-white text-black font-medium shadow-sm">
              Yearly
            </button>
            <button className="px-4 py-1.5 rounded-full text-white/70 hover:text-white">
              Monthly
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Start Plan */}
          <div className="relative flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-white/0 to-emerald-500/10 px-6 py-8 md:px-8 md:py-10 backdrop-blur">
            <h3 className="text-lg font-semibold">Start</h3>
            <p className="mt-1 text-sm text-white/60">
              Ideal for individuals managing personal crypto finances.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-white/80">
              <li className="flex items-center">
                <CheckIcon /> Up to 5 wallets
              </li>
              <li className="flex items-center">
                <CheckIcon /> Basic portfolio tracking
              </li>
              <li className="flex items-center">
                <CheckIcon /> Transaction history overview
              </li>
              <li className="flex items-center">
                <CheckIcon /> Support 24/7
              </li>
            </ul>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight">$15</span>
              <span className="text-sm text-white/60">/ per month</span>
            </div>
            <p className="text-xs text-emerald-300 mt-1">billed yearly</p>

            <button className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-500/90 px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:bg-emerald-400">
              Upgrade to Start
            </button>
            <p className="mt-3 text-center text-[11px] text-white/50">7 days free</p>
          </div>

          {/* Growth Plan */}
          <div className="relative flex flex-col rounded-3xl border border-emerald-400/70 bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-black px-6 py-9 md:px-8 md:py-11 shadow-[0_0_40px_rgba(16,185,129,0.35)] scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Growth</h3>
                <p className="mt-1 text-sm text-emerald-50/80 max-w-xs">
                  Built for traders and small businesses scaling their web3
                  operations.
                </p>
              </div>
              <span className="ml-2 rounded-full bg-emerald-300 text-emerald-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
                best choice
              </span>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-emerald-50/90">
              <li className="flex items-center">
                <CheckIcon /> Everything in Start
              </li>
              <li className="flex items-center">
                <CheckIcon /> Unlimited wallets
              </li>
              <li className="flex items-center">
                <CheckIcon /> Advanced portfolio insights
              </li>
              <li className="flex items-center">
                <CheckIcon /> Multi-chain support
              </li>
              <li className="flex items-center">
                <CheckIcon /> Priority customer support 24/7
              </li>
            </ul>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight">$39</span>
              <span className="text-sm text-emerald-50/80">/ per month</span>
            </div>
            <p className="text-xs text-emerald-200 mt-1">billed yearly</p>

            <button className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:bg-white/90">
              Upgrade to Growth
            </button>
            <p className="mt-3 text-center text-[11px] text-emerald-100/80">7 days free</p>
          </div>

          {/* Enterprise Plan */}
          <div className="relative flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-white/0 to-emerald-500/10 px-6 py-8 md:px-8 md:py-10 backdrop-blur">
            <h3 className="text-lg font-semibold">Enterprise</h3>
            <p className="mt-1 text-sm text-white/60 max-w-xs">
              Perfect for web3 builders, companies and financial teams.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-white/80">
              <li className="flex items-center">
                <CheckIcon /> Everything in Growth
              </li>
              <li className="flex items-center">
                <CheckIcon /> Dedicated account manager
              </li>
              <li className="flex items-center">
                <CheckIcon /> API access for custom integrations
              </li>
              <li className="flex items-center">
                <CheckIcon /> Multi-user permissions
              </li>
              <li className="flex items-center">
                <CheckIcon /> SLA-backed 24/7 support
              </li>
              <li className="flex items-center">
                <CheckIcon /> Compliance and audit reports
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-1">
              <span className="text-sm font-medium">Custom pricing</span>
              <span className="text-xs text-white/60">Tailored for your organization</span>
            </div>

            <button className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-emerald-300/70 bg-transparent px-4 py-2.5 text-sm font-semibold text-emerald-200 shadow-sm transition hover:bg-emerald-400/10">
              Contact Us
            </button>
            <p className="mt-3 text-center text-[11px] text-white/50">Individual</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPlans;