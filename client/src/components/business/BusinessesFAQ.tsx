import { BUSINESSES_FAQ } from "@/lib/businesses";
import { FaqSection } from "@/components/ui/FaqSection";

export function BusinessesFAQ() {
  return <FaqSection {...BUSINESSES_FAQ} />;
}
