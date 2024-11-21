import "../scss/button.scss";

interface ButtonProps {
  click?: () => void;
  title: string;
}

export default function Button({ title, click = () => {} }: ButtonProps) {
  return (
    <button className="w-20 bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 transition" onClick={click} type="submit">
      {title}
    </button>
  );
}
