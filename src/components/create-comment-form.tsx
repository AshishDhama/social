import { User } from "../models/user.model";
import { Textarea } from "./text-area";

type Props = {
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  users: User[];
};
export default function CreateCommentForm({ formRef, users }: Props) {
  return (
    <form ref={formRef} className="flex flex-col gap-8 py-">
      <div className="flex flex-col w-full">
        <label
          htmlFor="author"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Author
        </label>
          <select
            id="author"
            name="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
      </div>
      <Textarea label="Comment Body" id="body" name="body" />
    </form>
  );
}
