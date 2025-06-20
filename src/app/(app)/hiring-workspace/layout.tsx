export default function HiringWorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
