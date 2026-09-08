import Image from "next/image";

/** Swap `src` for real partner PNGs when ready — BikeWo logo is the stand-in. */
const PARTNERS = [
  { name: "Flipkart", src: "/brand/logo-primary.png" },
  { name: "Zomato", src: "/brand/logo-primary.png" },
  { name: "Hala", src: "/brand/logo-primary.png" },
  { name: "EVIFY", src: "/brand/logo-primary.png" },
  { name: "Rapido", src: "/brand/logo-primary.png" },
  { name: "Uber Green", src: "/brand/logo-primary.png" },
  { name: "Domino's Pizza", src: "/brand/logo-primary.png" },
] as const;

/** Partner arc under the hero — logo tiles orbit the semicircle rim. */
export function LovedBy() {
  const n = PARTNERS.length;

  return (
    <section
      aria-label="Trusted by leading enterprises"
      className="relative overflow-hidden bg-white"
    >
      <div className="relative mx-auto h-[min(78vw,30rem)] w-full max-w-5xl md:h-[28rem]">
        <p className="absolute left-1/2 top-[22%] z-10 w-[min(92%,28rem)] -translate-x-1/2 text-center font-sans text-lg font-medium leading-snug tracking-tight text-slate md:top-[24%] md:text-2xl">
          Trusted by leading enterprises building{" "}
          <span aria-hidden className="text-coral">
            India&apos;s EV future
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
                <div className="absolute left-1/2 top-0 flex size-[4.5rem] -translate-x-1/2 -translate-y-1/2 rotate-180 items-center justify-center rounded-2xl bg-white p-3 shadow-[0_8px_24px_rgb(36_31_93/0.14)] sm:size-20 md:size-24">
                  <Image
                    src={src}
                    alt={name}
                    width={160}
                    height={64}
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
