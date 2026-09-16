// Wireframe-style mockups — stand in for real project screenshots until
// there are live case studies to show. Each one is laid out like the actual
// UI it represents (nav+hero, product grid, dashboard, phone screen) using
// plain colour blocks, so it reads as a structural preview rather than a
// literal (and misleading) screenshot.
//
// Shared between the Portfolio section (grid of cards) and the portfolio
// detail page, keyed by the same `cover` string stored in the locale data.

export function CoverProfile() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 px-6 pb-5 pt-9">
      {/* nav bar */}
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-8 rounded-full bg-paper/40" />
        <div className="hidden items-center gap-3 sm:flex">
          <div className="h-1.5 w-4 rounded-full bg-paper/30" />
          <div className="h-1.5 w-4 rounded-full bg-paper/15" />
          <div className="h-1.5 w-4 rounded-full bg-paper/15" />
        </div>
        <div className="h-4 w-9 rounded-full bg-primary-500" />
      </div>

      {/* hero: eyebrow + heading + two CTAs + layered image */}
      <div className="flex flex-1 items-center gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-1.5 w-12 rounded-full bg-primary-500/70" />
          <div className="h-3 w-full rounded-full bg-paper/30" />
          <div className="h-3 w-4/5 rounded-full bg-paper/30" />
          <div className="h-1.5 w-2/3 rounded-full bg-paper/10" />
          <div className="mt-2 flex gap-1.5">
            <div className="h-4 w-11 rounded-full bg-primary-500" />
            <div className="h-4 w-11 rounded-full border border-paper/25" />
          </div>
        </div>
        <div className="relative aspect-square w-[30%] shrink-0">
          <div className="absolute inset-0 rounded-xl bg-primary-500/20" />
          <div className="absolute -bottom-2 -left-2 h-1/2 w-1/2 rounded-lg bg-primary-500/60" />
        </div>
      </div>

      {/* client logo strip */}
      <div className="flex items-center justify-between border-y border-paper/10 py-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1.5 w-6 rounded-full bg-paper/15" />
        ))}
      </div>

      {/* feature cards with icon token */}
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5 rounded-md bg-paper/[0.06] p-2">
            <div className="h-3 w-3 rounded-full bg-primary-500/70" />
            <div className="h-1.5 w-full rounded-full bg-paper/20" />
            <div className="h-1.5 w-2/3 rounded-full bg-paper/10" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CoverCommerce() {
  return (
    <div className="absolute inset-0 flex flex-col px-6 pb-6 pt-10">
      {/* search + cart */}
      <div className="flex items-center gap-2">
        <div className="h-5 flex-1 rounded-full bg-paper/10" />
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500">
          <span className="h-1.5 w-1.5 rounded-full bg-paper" />
        </div>
      </div>

      {/* product grid */}
      <div className="mt-4 grid flex-1 grid-cols-3 gap-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className={`aspect-square rounded-lg ${i === 1 || i === 4 ? 'bg-primary-500/50' : 'bg-paper/10'}`} />
            <div className="h-1.5 w-3/4 rounded-full bg-paper/20" />
            <div className="h-1.5 w-1/2 rounded-full bg-primary-500/70" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CoverSystem() {
  return (
    <div className="absolute inset-0 flex px-6 pb-6 pt-10">
      {/* sidebar */}
      <div className="mr-4 flex flex-col items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-primary-500" />
        <div className="h-2 w-2 rounded-full bg-paper/20" />
        <div className="h-2 w-2 rounded-full bg-paper/20" />
        <div className="h-2 w-2 rounded-full bg-paper/20" />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {/* stat cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="h-8 rounded-lg bg-paper/10" />
          <div className="h-8 rounded-lg bg-paper/10" />
          <div className="h-8 rounded-lg bg-paper/10" />
        </div>
        {/* bar chart */}
        <div className="flex flex-1 items-end gap-1.5 rounded-lg bg-paper/[0.06] p-3">
          {[40, 65, 35, 80, 55, 90, 45].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-sm ${i === 5 ? 'bg-primary-500' : 'bg-paper/25'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CoverMobile() {
  return (
    <div className="absolute inset-0 flex items-center justify-center py-6">
      <div className="flex h-full w-[42%] flex-col rounded-[1.4rem] border border-paper/20 p-2.5">
        {/* status bar */}
        <div className="flex items-center justify-between px-1">
          <div className="h-1 w-6 rounded-full bg-paper/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-paper/30" />
        </div>
        {/* screen title */}
        <div className="mt-2.5 h-2 w-1/2 rounded-full bg-paper/30" />
        {/* date grid */}
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`aspect-square rounded-md ${i === 3 ? 'bg-primary-500' : 'bg-paper/10'}`} />
          ))}
        </div>
        {/* booking list */}
        <div className="mt-3 flex-1 space-y-1.5">
          <div className="h-4 rounded-md bg-paper/10" />
          <div className="h-4 rounded-md bg-primary-500/40" />
          <div className="h-4 rounded-md bg-paper/10" />
        </div>
        {/* bottom nav */}
        <div className="mt-2 flex justify-around border-t border-paper/10 pt-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-primary-500' : 'bg-paper/20'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Locale content stores a `cover` key ('profile' | 'commerce' | 'system' |
// 'mobile') rather than a component reference, keeping the i18n data plain.
export const COVERS = {
  profile: CoverProfile,
  commerce: CoverCommerce,
  system: CoverSystem,
  mobile: CoverMobile,
}
