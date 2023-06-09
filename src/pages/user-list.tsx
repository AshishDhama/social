import { User } from "../models/user.model";
import { UserCard } from "../components/user-card";

import { useNavigate } from "react-router-dom";
import { useAddUserMutation, useFetchUsersQuery, useRemoveUserMutation } from "../store";
import Spinner from "../components/spinner";
import CreateButton from "../components/create-button";
import Modal from "../components/modal";
import { useRef, useState } from "react";
import CreateUserForm from "../components/create-user-form";

export default function UserListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null) ;
  const [createUser] = useAddUserMutation();
  const [deleteUser] = useRemoveUserMutation();

  const navigate = useNavigate();
  const { data, error, isFetching } = useFetchUsersQuery();

  function handleClick(user: User) {
    navigate(`/users/${user.id}`);
  }

  function handleDelete(user: User) {
    deleteUser(user);
  }

  let content: JSX.Element | JSX.Element[] | null = null;
  if (isFetching) {
    content = <Spinner />;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else if (data) {
    content = data.map((user: User) => {
      return <UserCard key={user.id} user={user} onClick={handleClick} onDelete={handleDelete}/>;
    });
  }
  function handleCreateUser()  {
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const user: Omit<User, 'id'> = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        gender: formData.get('gender') as string,
        status: formData.get('status') as string,
      };
      console.log(user);
      createUser(user);
      setIsModalOpen(false);
    }
   }

   function handleCreate()  {
    setIsModalOpen(true);
   }

  return <div className="grid grid-cols-[repeat(auto-fill,_minmax(16rem,_1fr))] gap-8 p-8">
    <div className="flex items-center justify-center gap-x-6 bg-gray-50 border-dashed border-2 border-gray-500 rounded-md p-8 flex-col">
      <CreateButton text='User' onClick={handleCreate} />
    </div>
    {content}
    <Modal title="Create User" body={<CreateUserForm formRef={formRef} />} isOpen={isModalOpen} onCancel={() => setIsModalOpen(false)} onConfirm={handleCreateUser}/>
    </div>;
}

