import { User } from '@prisma/client';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import { z } from 'zod';
import { api } from '../utils/api';
import DateInput from './DateInput';
import NumberInput from './inputs/NumberInput';
import ListSelect, { ListOption } from './ListSelect';

function mapUserToOption(user: User): ListOption {
  return { key: user?.id ?? '', label: user?.userName ?? '' };
}

const transactionSchema = z.object({
  userId: z.string(),
  date: z.date(),
  amount: z.number(),
});

type Transaction = z.infer<typeof transactionSchema>;

type Optional<Type> = {
  [Property in keyof Type]?: Type[Property];
};

type TransactionProps = {
  userId: string;
  date: Date | undefined;
  amount: number;
};

function isValid({ userId, amount, date }: Optional<TransactionProps>) {
  return userId !== undefined && amount !== undefined && date !== undefined;
}

interface CreateTransactionProps {
  refetchTransactions: () => void;
}

const CreateTransaction: FC<CreateTransactionProps> = ({ refetchTransactions }) => {
  const { data: users = [] } = api.user.getAll.useQuery();
  const { mutate: createTransaction } = api.transaction.create.useMutation();
  const [transaction, setTransaction] = useState<Optional<TransactionProps>>({});
  const selectedUser = users.find((user) => user.id === transaction.userId);

  const handleSave = () => {
    const { userId, amount, date } = transaction;
    if (!userId || !amount || !date) return;
    createTransaction(
      { userId, amount, date },
      {
        onSuccess: () => {
          setTransaction({});
          refetchTransactions();
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-gradient-to-r from-cyan-800 to-blue-800 p-2 text-lg">Create Transaction</div>
      <div className="mx-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-24">User</div>
          <ListSelect
            className="rounded border border-cyan-700 bg-inherit text-white hover:border-cyan-400"
            iconClassName="hover:text-cyan-400"
            options={users.map(mapUserToOption)}
            selected={selectedUser ? mapUserToOption(selectedUser) : undefined}
            onOptionChange={(option) => setTransaction({ ...transaction, userId: option?.key })}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24">Amount</div>
          <NumberInput
            className="rounded border border-cyan-700 bg-inherit text-white hover:border-cyan-400"
            number={transaction.amount}
            onNumberChange={(amount) => setTransaction({ ...transaction, amount })}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24">Date</div>
          <DateInput
            className="grow"
            inputClassName="rounded border border-cyan-700 bg-inherit text-white hover:border-cyan-400"
            date={transaction.date}
            onDateChange={(date) => setTransaction({ ...transaction, date })}
            isClearable={true}
          />
        </div>
      </div>
      <div className="mx-2">
        <button
          className="flex h-10 items-center rounded bg-gradient-to-r from-rose-700 to-red-700"
          onClick={handleSave}
        >
          <div
            className={classNames(
              'flex h-full w-full items-center gap-2 rounded bg-black/25 p-3 hover:bg-black/0',
              !isValid(transaction) && 'cursor-not-allowed bg-gray-400 hover:bg-gray-400'
            )}
          >
            <VscAdd className={'h-full w-6 flex-shrink-0 rounded-l hover:cursor-pointer'} />
            <div>Create</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CreateTransaction;
