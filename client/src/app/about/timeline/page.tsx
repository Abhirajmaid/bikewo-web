import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/page/PlaceholderPage";

const HREF = "/about/timeline";

export const metadata = placeholderMetadata(HREF);

export default function Page() {
  return <PlaceholderPage href={HREF} />;
}
