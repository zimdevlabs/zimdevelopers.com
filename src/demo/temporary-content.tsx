export default function TemporaryContent({ text }: { text?: string }) {
  return (
    <div className="h-[50vh] grid place-content-center w-full">
      <main>{text || "Hello World"}</main>
    </div>
  );
}
