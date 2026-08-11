import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/page/PlaceholderPage";

const HREF = "/businesses/lifecycle-services";

export const metadata = placeholderMetadata(HREF);

export default function Page() {
  return <PlaceholderPage href={HREF} />;
}
