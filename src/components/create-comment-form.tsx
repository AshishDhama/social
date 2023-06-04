import { User } from "../models/user.model";
import { Textarea } from "./text-area";

type Props = {
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  onSubmit: () => void;
  users: User[];
};
export default function CreateCommentForm({formRef, onSubmit, users }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }
  return (
    <form ref={formRef}   onSubmit={handleSubmit}
      className="w-full max-w-[1440px] mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
        <Textarea label="Comment Body" id="body" name="body"/>
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
        <div className="flex items-center space-x-3">
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Author
        </label>
        <select
          id="author"
          name="author"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        </div>
        <div className="flex pl-0 space-x-1 sm:pl-2">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-semibold text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Post comment
          </button>
        </div>
      </div>
    </form>
  );
}
