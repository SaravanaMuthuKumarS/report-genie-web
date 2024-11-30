interface ButtonProps {
  click?: () => void;
  title: string;
  disable?: boolean;
}

export default function Button({
  title,
  click = () => {},
  disable = false,
}: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={disable}
      className={`w-max py-2 px-4 transition rounded-lg ${
        disable
          ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
      onClick={click}
    >
      {title}
    </button>
  );
}
