import { PlusIcon } from "@heroicons/react/20/solid";

type Props = {
    text?: string;
    onClick: () => void;
}
export default function CreateButton({ text = 'Create', onClick }: Props) {

  return (
    <button onClick={onClick} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200">
      <PlusIcon className="w-4 h-4" />
      {text}
    </button>
  );
}