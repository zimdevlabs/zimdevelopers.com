export default function DeveloperWorkspaceLayout({
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
