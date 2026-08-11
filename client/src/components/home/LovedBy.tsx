import Image from "next/image";

/** Swap `src` for real partner PNGs when ready — BikeWo logo is the stand-in. */
const PARTNERS = [
  { name: "Partner 1", src: "/brand/logo-primary.png" },
  { name: "Partner 2", src: "/brand/logo-primary.png" },
  { name: "Partner 3", src: "/brand/logo-primary.png" },
  { name: "Partner 4", src: "/brand/logo-primary.png" },
  { name: "Partner 5", src: "/brand/logo-primary.png" },
  { name: "Partner 6", src: "/brand/logo-primary.png" },
  { name: "Partner 7", src: "/brand/logo-primary.png" },
] as const;

/** Partner arc under the hero — logo tiles orbit the semicircle rim. */
export function LovedBy() {
  const n = PARTNERS.length;

  return (
    <section
      aria-label="Trusted by leading EV names"
      className="relative overflow-hidden bg-white"
    >
      <div className="relative mx-auto h-[min(62vw,30rem)] w-full max-w-5xl md:h-[28rem]">
        <p className="absolute left-1/2 top-[18%] z-10 w-[min(90%,22rem)] -translate-x-1/2 text-center font-sans text-[15px] font-medium leading-snug tracking-tight text-slate md:top-[22%] md:text-base">
          We are loved by the largest EV names{" "}
          <span aria-hidden className="text-coral">
            ♥
          </span>
        </p>

        <div
          aria-hidden
          className="absolute left-1/2 top-0 size-[min(150vw,48rem)] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute inset-0 rounded-full bg-[#e4e8f6]" />

          <div className="absolute inset-0 [animation:bw-orbit_40s_linear_infinite] motion-reduce:[animation:none]">
            {PARTNERS.map(({ name, src }, i) => (
              <div
                key={name}
                className="absolute inset-0"
                style={{ transform: `rotate(${(360 / n) * i}deg)` }}
              >
                <div className="absolute left-1/2 top-0 flex size-14 -translate-x-1/2 -translate-y-1/2 rotate-180 items-center justify-center rounded-2xl bg-white p-2.5 shadow-[0_8px_24px_rgb(36_31_93/0.14)] sm:size-16 md:size-[4.25rem]">
                  <Image
                    src={src}
                    alt=""
                    width={120}
                    height={48}
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
