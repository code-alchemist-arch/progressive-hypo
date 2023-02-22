interface ButtonProps {
  type: "button" | "submit" | "reset";
  caption: string;
  onClick?: () => void;
}

export default function Button({ type, caption, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      className="rounded-xl bg-red text-white text-sm font-semibold w-full py-4"
      onClick={onClick ? onClick : () => {}}
    >
      {caption}
    </button>
  );
}
