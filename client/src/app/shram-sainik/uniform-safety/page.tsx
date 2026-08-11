import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/page/PlaceholderPage";

const HREF = "/shram-sainik/uniform-safety";

export const metadata = placeholderMetadata(HREF);

export default function Page() {
  return <PlaceholderPage href={HREF} />;
}
