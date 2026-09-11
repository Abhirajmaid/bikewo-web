import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

/** Article posts were replaced by NSE document cards on /media. */
export default async function LegacyMediaSlugPage({ params }: Props) {
  await params;
  redirect("/media");
}
