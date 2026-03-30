export function MobileBlocker() {
  return (
    <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center px-6 font-mono lg:hidden">
      <div className="text-center max-w-sm w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-40 bg-[#13121f] border-2 border-[#2a2a40] rounded-lg p-3">
            <div className="bg-[#0a0a14] rounded h-20 flex items-center justify-center overflow-hidden relative">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(99,102,241,0.05) 3px, rgba(99,102,241,0.05) 4px)",
                }}
              />
              <div className="relative z-10 text-center leading-relaxed">
                <p className="text-[9px] text-indigo-500 tracking-widest">
                  ACCESS DENIED
                </p>
                <p className="text-[9px] text-indigo-500 tracking-widest">
                  SMALL SCREEN
                </p>
                <span className="inline-block w-1.5 h-2.5 bg-indigo-500 mt-1 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="w-5 h-3 bg-[#1e1e2e] border-x-2 border-[#2a2a40]" />

          <div className="w-14 h-2 bg-[#1e1e2e] border-2 border-[#2a2a40] rounded" />

          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 animate-pulse" />
        </div>

        <h1 className="text-[17px] font-semibold text-[#e8e8ff] tracking-tight leading-snug mb-3">
          Desktop required
          <br />
          to access admin
        </h1>

        <p className="text-xs text-[#4a4a6a] leading-relaxed mb-7">
          This panel is built for{" "}
          <span className="text-indigo-500">larger screens</span>.
          <br />
          Please switch to a computer to continue.
        </p>

        <div className="flex items-center justify-center gap-2 mb-7">
          {["WIN", "or", "⌘ MAC"].map((k, i) =>
            k === "or" ? (
              <span key={i} className="text-[11px] text-[#3b3b5c]">
                or
              </span>
            ) : (
              <span
                key={i}
                className="bg-[#1a1a2e] border border-[#2e2e4a] border-b-[3px] rounded px-2.5 py-1 text-[11px] text-indigo-400 tracking-widest"
              >
                {k}
              </span>
            ),
          )}
        </div>

        <p className="text-[11px] text-[#2e2e42] tracking-widest border-t border-[#1a1a2e] pt-5">
          MIN RESOLUTION&nbsp;&nbsp;
          <span className="text-[#3d3d5c]">1024 × 768</span>
        </p>
      </div>
    </div>
  );
}
