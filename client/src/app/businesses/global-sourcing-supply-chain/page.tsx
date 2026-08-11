import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/page/PlaceholderPage";

const HREF = "/businesses/global-sourcing-supply-chain";

export const metadata = placeholderMetadata(HREF);

export default function Page() {
  return <PlaceholderPage href={HREF} />;
}
