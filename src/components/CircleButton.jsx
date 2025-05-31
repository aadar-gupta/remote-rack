import clsx from 'clsx';

export default function CircleButton({ type = "filled", color = "primary", text, className = "", onClick }) {
  const baseColor = {
    primary: {
      filled: "bg-primary hover:bg-primary/90 text-white",
      outlined: "border-2 border-primary text-primary hover:bg-primary/10",
    },
    secondary: {
      filled: "bg-secondary hover:bg-secondary/90 text-charcoal border border-charcoal",
      outlined: "border-2 border-secondary text-secondary hover:bg-secondary/10",
    },
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-8 py-3 rounded-full font-medium transition-all duration-300 text-center inline-block min-w-[200px]",
        baseColor[color][type],
        className
      )}
    >
      {text}
    </button>
  );
}
