// Full class names so Tailwind can find them in the source
const COLOR_CLASSES: Record<string, string> = {
  black: "bg-black",
  blue: "bg-blue-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  pink: "bg-pink-400",
  purple: "bg-purple-500",
  red: "bg-red-500",
  white: "bg-white",
  yellow: "bg-yellow-400",
};

export default function RouteColor({ color }: { color: string }) {
  return (
    <span
      title={color}
      className={`inline-block size-3 shrink-0 rounded-full border border-border ${COLOR_CLASSES[color] ?? "bg-gray-400"}`}
    />
  );
}
