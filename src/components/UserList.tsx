import { User } from '@prisma/client';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface UserListProps {
  users: User[];
  selectedUserIds: string[];
  setSelectedUserIds: (selectedUserIds: string[]) => void;
}

const UserList: FC<UserListProps> = ({ users, selectedUserIds, setSelectedUserIds }) => {
  const toggleUserId = (userId: string) => {
    if (selectedUserIds.includes(userId)) {
      const index = selectedUserIds.indexOf(userId);
      const updatedIds = [...selectedUserIds];
      updatedIds.splice(index, 1);
      setSelectedUserIds(updatedIds);
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  return (
    <div className="flex h-full flex-col gap-2 p-2">
      {users.map((user) => (
        <div
          className="flex w-full gap-2 rounded bg-gradient-to-r from-cyan-700 to-blue-700 hover:cursor-pointer"
          key={user.id}
          onClick={() => toggleUserId(user.id)}
        >
          <div className={'flex h-full w-full gap-2 rounded bg-black/25 px-2 py-1 hover:bg-black/0'}>
            <BiUserCircle className={'h-6 w-6'} />
            <div className="grow select-none">{user.userName}</div>
            {selectedUserIds.includes(user.id) && <AiOutlineCheckCircle className={'h-6 w-6'} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
