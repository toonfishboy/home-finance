import classNames from 'classnames';
import { FC, useState, ChangeEvent, useEffect } from 'react';

interface NumberInputProps {
  number: number | undefined;
  onNumberChange: (number: number | undefined) => void;
  className?: string;
}

const NumberInput: FC<NumberInputProps> = ({ number, onNumberChange, className }) => {
  const [text, setText] = useState<string>(number?.toString() ?? '');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length === 0) {
      setText('');
      onNumberChange(undefined);
      return;
    }
    //regex to check for a number with a point separator
    const regex = new RegExp(/^[0-9]+[\.,]?[0-9]*$/);
    const result = value.match(regex);
    if (result === null) return;
    const number = parseFloat(value);
    onNumberChange(number);
    setText(value);
  };

  //check if number was changed from the outside and synch text state
  useEffect(() => {
    if ((text.length === 0 && number !== undefined) || (text.length !== 0 && parseFloat(text) !== number))
      setText(number?.toString() ?? '');
  }, [text, number]);

  return (
    <input
      value={text}
      type={'text'}
      onChange={handleOnChange}
      className={classNames('grow px-2 py-1 outline-none', className)}
    />
  );
};

export default NumberInput;
