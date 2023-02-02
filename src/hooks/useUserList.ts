import { useMemo, useState } from 'react';
import { api } from '../utils/api';

export interface UseUserListProps {
  isSingle?: boolean;
}

export function useUserList({ isSingle }: UseUserListProps = {}) {
  const { data: users = [], ...queryProps } = api.user.getAll.useQuery();

  const initIds = useMemo(() => {
    if (isSingle && users[0]) return [users[0].id];
    else return users.map((user) => user.id);
  }, [isSingle, users]);

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(initIds);

  return { users, selectedUserIds, setSelectedUserIds, queryProps, isSingle };
}
