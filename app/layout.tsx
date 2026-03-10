import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskSmith — AI Micro Task Generator",
  description:
    "TaskSmith uses AI to instantly decompose any complex task into clear, actionable micro-steps. Boost your productivity with intelligent task breakdown.",
  keywords: ["AI", "task management", "productivity", "micro tasks", "task decomposition"],
  openGraph: {
    title: "TaskSmith — AI Micro Task Generator",
    description: "Break down complex tasks into micro-steps with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
