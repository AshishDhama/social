import { User } from "../models/user.model";

type Props = {
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  users: User[]
};
export default function CreateCommentForm({ formRef, users }: Props) {
  return (
    <form ref={formRef}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="author"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Author
              </label>
              <div className="mt-2">
                <select
                  id="author"
                  name="author"
                  autoComplete="name"
                  className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="body"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Body
              </label>
              <div className="mt-2">
                <input
                  id="body"
                  name="body"
                  type="text"
                  className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
