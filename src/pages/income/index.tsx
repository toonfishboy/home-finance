import { FC } from 'react';
import Layout from '../../components/Layout';
import UserList from '../../components/UserList';
import { useUserList } from '../../hooks/useUserList';
import { api } from '../../utils/api';

const Page: FC = () => {
  const { selectedUserIds, ...userProps } = useUserList({ isSingle: true });
  const { data: incomes = [] } = api.income.getAll.useQuery({ userId: selectedUserIds[0] ?? '' });

  return (
    <Layout>
      <div className="grid h-full grid-cols-[minmax(300px,1fr)_3fr] overflow-hidden">
        <div className="h-full w-full bg-gray-800">
          <UserList {...userProps} selectedUserIds={selectedUserIds} />
        </div>
        <div className="h-full w-full">
          {incomes.map((income) => (
            <div key={income.id}>{income.income}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
