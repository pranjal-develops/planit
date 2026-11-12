import React from "react";
import type { User } from "../../../types";

interface ProfilePageProps {
  user?: User | null;
  onEditProfile?: () => void;
}

export default function ProfilePage({ user, onEditProfile }: ProfilePageProps) {
  // const { user} = useSelector((state: RootState) => state.auth);

  if (user === null || user === undefined) {
    return null;
  }

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username;

  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const profileCompletion = getProfileCompletion(user);

  return (
    <main className="h-screen overflow-scroll">
      {/* bg-[oklch(0.145_0.01_148)] */}
      {/* bg-[#09090b] */}
      {/* Background decoration */}
      {/* <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[150px]" />
        <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute left-[-200px] top-1/2 h-[450px] w-[450px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
      </div> */}

      {/* Navbar */}
      {/* <nav className="relative z-10 border-b border-white/[0.08] bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 font-bold">
              P
            </div>

            <span className="font-semibold tracking-tight">Profile</span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-zinc-400 sm:flex">
            <a href="#" className="text-white">
              Overview
            </a>
            <a href="#" className="transition hover:text-white">
              Activity
            </a>
            <a href="#" className="transition hover:text-white">
              Settings
            </a>
          </div>

          <button className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white">
            •••
          </button>
        </div>
      </nav> */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
        {/* Cover image */}
        <section className="relative h-48 overflow-hidden rounded-3xl border border-white/10  shadow-2xl sm:h-64">
          {user.banner ? (
            <img
              src={user.banner}
              alt=""
            />
          ) : (
            <div className=" bg-linear-to-br from-violet-950 via-indigo-900 to-slate-950 shadow-2xl sm:h-64">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_25%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.35),transparent_35%)]" />

              <div className="absolute -right-16 -top-32 h-96 w-96 rounded-full border border-white/10 bg-white/3" />
              <div className="absolute -bottom-48 left-1/3 h-96 w-96 rounded-full border border-white/10 bg-white/3" />
            </div>
          )}
          <button className="absolute right-5 top-5 rounded-xl border border-white/15 bg-black/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/40">
            Change cover
          </button>
        </section>

        {/* Profile heading */}
        <section className="relative -mt-16 px-4 sm:-mt-20 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end">
              <div className="relative">
                {user.pfp ? (
                  <img
                    src={user.pfp}
                    alt={`${fullName} profile`}
                    className="h-32 w-32 rounded-3xl border-4 border-[#09090b] object-cover shadow-2xl sm:h-40 sm:w-40"
                  />
                ) : (
                  <div className="grid h-32 w-32 place-items-center rounded-3xl border-4 border-[#09090b] bg-linear-to-br from-violet-500 to-fuchsia-500 text-4xl font-bold shadow-2xl sm:h-40 sm:w-40">
                    {initials}
                  </div>
                )}

                {user.active && (
                  <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-[#09090b] bg-emerald-400" />
                )}
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {fullName}
                  </h1>

                  {user.active && (
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      Active
                    </span>
                  )}
                </div>

                <p className="mt-1 text-base text-zinc-400">@{user.username}</p>
              </div>
            </div>

            <button
              onClick={onEditProfile}
              className="w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Edit profile
            </button>
          </div>
        </section>

        {/* Content */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <GlassCard>
              <CardHeading
                title="About"
                description="Personal information and account details"
              />

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <InfoItem label="Username" value={`@${user.username}`} />
                <InfoItem
                  label="Email address"
                  value={user.email || "Not provided"}
                />
                <InfoItem label="Account role" value={user.role || "User"} />
                <InfoItem
                  label="Member since"
                  value={formatDate(user.createdAt)}
                />
              </div>
            </GlassCard>

            <GlassCard>
              <CardHeading
                title="Recent activity"
                description="Your latest account activity"
              />

              <div className="mt-6 space-y-5">
                <ActivityItem
                  title="Account status"
                  description={
                    user.active
                      ? "Your account is currently active"
                      : "Your account is currently inactive"
                  }
                  color={user.active ? "bg-emerald-400" : "bg-zinc-500"}
                />

                <ActivityItem
                  title="Last login"
                  description={formatDate(user.lastLoginAt)}
                  color="bg-blue-400"
                />

                <ActivityItem
                  title="Profile updated"
                  description={formatDate(user.updatedAt)}
                  color="bg-violet-400"
                  last
                />
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard>
              <CardHeading title="Profile completion" />

              <div className="mt-6">
                <div className="mb-3 flex justify-between text-sm">
                  <span className="text-zinc-400">Profile strength</span>
                  <span className="font-semibold">{profileCompletion}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-violet-500 to-fuchsia-400"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-500">
                  Add more details to make your profile easier to identify.
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <CardHeading title="Preferences" />

              <div className="mt-6 space-y-5">
                <InfoItem
                  label="Timezone"
                  value={user.preferredTimezone || "Not set"}
                />

                <InfoItem label="Profile visibility" value="Public" />

                <InfoItem label="Password" value="••••••••••••" />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/9 bg-white/4.5 p-6 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-7">
      {children}
    </section>
  );
}

function CardHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>

      {description && (
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-black/10 p-4">
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>

      <p className="mt-2 truncate text-sm text-zinc-200">{value}</p>
    </div>
  );
}

function ActivityItem({
  title,
  description,
  color,
  last = false,
}: {
  title: string;
  description: string;
  color: string;
  last?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="relative">
        <span className={`mt-1 block h-3 w-3 rounded-full ${color}`} />

        {!last && (
          <span className="absolute left-1.25 top-5 h-8 w-px bg-white/10" />
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-200">{title}</p>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

function formatDate(date?: string) {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

function getProfileCompletion(user: User) {
  const fields = [
    user.email,
    user.pfp,
    user.firstName,
    user.lastName,
    user.role,
    user.preferredTimezone,
  ];

  const completedFields = fields.filter(Boolean).length;

  return Math.round((completedFields / fields.length) * 100);
}
