import Link from 'next/link';
import { FC } from 'react';
import Layout from '../components/Layout';
import { api } from '../utils/api';

const Page: FC = () => {
  const { data: users } = api.user.getAll.useQuery();
  const { data: transactions, refetch: refetchTransactions } = api.transaction.getAll.useQuery();
  const { mutate: createTransaction } = api.transaction.create.useMutation();
  const { mutate: deleteTransaction } = api.transaction.delete.useMutation();

  const handleCreateTransaction = (userId: string) => {
    createTransaction(
      { date: new Date(), userId, amount: Math.random() * 20 },
      { onSuccess: () => refetchTransactions() }
    );
  };

  const handleDeleteTransaction = (transactionId: string) => {
    deleteTransaction({ id: transactionId }, { onSuccess: () => refetchTransactions() });
  };

  return (
    <Layout>
      <div className="flex h-full flex-col">
        <div className="flex grow flex-col gap-2">
          {users?.map((user) => (
            <div
              className="rounded bg-indigo-700 px-4 py-2 text-white shadow-inner hover:cursor-pointer hover:bg-indigo-400"
              key={user.id}
              onClick={() => handleCreateTransaction(user.id)}
            >
              {user.email}:{user.role}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {transactions?.map((transaction) => (
            <div
              className="flex gap-2 rounded bg-rose-700 px-4 py-2 text-white shadow-inner hover:cursor-pointer hover:bg-rose-400"
              onClick={() => handleDeleteTransaction(transaction.id)}
            >
              <span>{transaction.date.toLocaleDateString()}</span>
              <span>{transaction.user.userName}</span>
              <span>{transaction.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
