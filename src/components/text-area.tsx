type Props = {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  rows?: number;
};
export function Textarea({ label, id, name, placeholder = "Write your thoughts here...", rows=2 }: Props) {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}
