import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/page/PlaceholderPage";

const HREF = "/terms";

export const metadata = placeholderMetadata(HREF);

export default function Page() {
  return <PlaceholderPage href={HREF} />;
}
