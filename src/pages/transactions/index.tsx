import { FC, useState } from 'react';
import Layout from '../../components/Layout';
import { api } from '../../utils/api';
import { BiUserCircle } from 'react-icons/bi';
import { CgCalendarDates } from 'react-icons/cg';
import { AiOutlineEuro, AiOutlineReload, AiOutlineDelete } from 'react-icons/ai';
import { VscAdd } from 'react-icons/vsc';
import 'react-datepicker/dist/react-datepicker.css';
import DateInput from '../../components/DateInput';
import UserList from '../../components/UserList';
import Loading from '../../components/Loading';
import CreateTransaction from '../../components/CreateTransaction';

const Page: FC = () => {
  const { data: users = [], ...usersQueryProps } = api.user.getAll.useQuery();
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(users.map((user) => user.id));
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState<Date | undefined>();
  const { data: transactions, refetch: refetchTransactions } = api.transaction.getAll.useQuery({
    userIds: selectedUserIds,
    startTime,
    endTime,
  });
  const { mutate: deleteTransaction } = api.transaction.delete.useMutation();

  return (
    <Layout>
      <div className="flex h-full flex-col overflow-auto">
        <div className="flex h-3/4 overflow-auto">
          <div className="h-full w-1/6">
            <Loading {...usersQueryProps}>
              <div>
                <div className="flex w-full flex-col px-2">
                  <span>StartTime</span>
                  <DateInput
                    className="grow"
                    inputClassName="rounded border border-cyan-700 bg-inherit text-white hover:border-cyan-400"
                    date={startTime}
                    onDateChange={(date) => setStartTime(date ?? undefined)}
                    isClearable={true}
                  />
                </div>
                <div className="flex w-full flex-col px-2">
                  <span>EndTime</span>
                  <DateInput
                    className="grow"
                    inputClassName="rounded border border-cyan-700 bg-inherit text-white hover:border-cyan-400"
                    date={endTime}
                    onDateChange={(date) => setEndTime(date ?? undefined)}
                    isClearable={true}
                  />
                </div>
                <div className="border-b border-slate-500 pt-2" />
                <UserList
                  users={users}
                  selectedUserIds={selectedUserIds}
                  setSelectedUserIds={setSelectedUserIds}
                />
              </div>
            </Loading>
          </div>
          <div className="flex h-full w-5/6 flex-col">
            <div className="m-2 flex grow flex-col gap-2 overflow-auto">
              {transactions?.map((transaction) => (
                <div
                  key={transaction.id}
                  className="rounded bg-gradient-to-br from-gray-700 to-gray-600 px-2 py-4 shadow-md"
                >
                  <div className="flex gap-2">
                    <BiUserCircle className={'h-6 w-6'} />
                    <span>{transaction.user.userName}</span>
                  </div>
                  <div className="flex gap-2">
                    <CgCalendarDates className={'h-6 w-6'} />
                    <span>{transaction.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <AiOutlineEuro className={'h-6 w-6'} />
                    <span>{transaction.amount}</span>
                  </div>
                  <AiOutlineDelete
                    className={'h-6 w-6 hover:cursor-pointer hover:text-red-500'}
                    onClick={() =>
                      deleteTransaction({ id: transaction.id }, { onSuccess: () => refetchTransactions() })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-1/4">
          <CreateTransaction refetchTransactions={refetchTransactions} />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
