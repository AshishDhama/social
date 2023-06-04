import { Textarea } from "./text-area";

type Props = {
  formRef: React.MutableRefObject<HTMLFormElement | null>;
};
export default function CreatePostForm({ formRef }: Props) {
  return (
    <form ref={formRef} className="mt-10 flex flex-col gap-x-6 gap-y-8">
      <div className="sm:col-span-3">
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Post Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="title"
            id="title"
            className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <Textarea label="Post Body" id="body" name="body" />
    </form>
  );
}
