export function CreateUserButton() {
  const [createUser] = useCreateUserMutation({
    refetchQueries: [{ query: UsersDocument }],
  });

  return (
    <button
      onClick={() => {
        createUser({
          variables: {
            input: {
              name: "John Doe",
              email: ""