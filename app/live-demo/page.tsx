import type { Metadata } from "next";
import { LiveDemo } from "@/components/live-demo/LiveDemo";
import { buildMetadata } from "@/lib/seo";
import "./live-demo.css";

export const metadata: Metadata = buildMetadata({
  title: "Live Demo, No Sign-up | Try Nipige Restaurant and Fashion",
  description:
    "Try Nipige yourself. Pick a restaurant or fashion marketplace and step in as the customer, the seller and the owner. One click, no sign-up.",
  path: "/live-demo",
});

export default function LiveDemoPage() {
  return <LiveDemo />;
}
