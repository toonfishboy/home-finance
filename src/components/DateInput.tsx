import classNames from 'classnames';
import { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateInput.module.scss';

interface DateInputProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  isClearable?: boolean;
  className?: string;
  inputClassName?: string;
}

const DateInput: FC<DateInputProps> = ({ date, onDateChange, isClearable, className, inputClassName }) => {
  return (
    <div className={classNames(className)}>
      <DatePicker
        isClearable={isClearable}
        selected={date}
        onChange={(date) => onDateChange(date ?? undefined)}
        clearButtonClassName={styles.dateButton}
        className={classNames('w-full bg-inherit px-2 py-1 outline-none', inputClassName)}
        wrapperClassName={styles.dateWrapper}
      />
    </div>
  );
};

export default DateInput;
