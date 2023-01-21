import classNames from 'classnames';
import { useState, KeyboardEvent, useEffect, useRef, MouseEvent } from 'react';
import { MdKeyboardArrowDown, MdClear } from 'react-icons/md';

export type ListOption<T = unknown> = {
  key: string;
  label: string;
  value?: T;
};

/**
 * Checks if the given value that can be a string or an ListOption is an option
 * @param value select option
 * @returns
 */
function isListOption<T>(value: ListOption<T> | string | undefined): value is ListOption<T> {
  return typeof value !== 'string' && value !== undefined;
}

/**
 * Displays the title of the given option value
 * @param value select option
 * @returns
 */
function displayOption<T>(value: ListOption<T> | string | undefined): string {
  return isListOption(value) ? value.label : value ?? '';
}

/**
 * Returns a key from the given option
 * @param value select option
 * @returns
 */
function getOptionKey<T>(value: ListOption<T> | string): string {
  return isListOption(value) ? value.key : value;
}

interface ListSelectProps<T = undefined> {
  options: ListOption<T>[] | string[];
  selected: ListOption<T> | string | undefined;
  onOptionChange?: (option: ListOption<T> | undefined) => void;
  onStringChange?: (option: string | undefined) => void;
  disabled?: boolean;
  className?: string;
  overlayClassName?: string;
  isClearable?: boolean;
  iconClassName?: string;
}

const ListSelect = <T,>({
  className,
  options,
  selected,
  onOptionChange,
  onStringChange,
  overlayClassName,
  isClearable,
  iconClassName,
}: ListSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const handleRefClick = (event: Event) => {
      if (isOpen && !containerRef.current?.contains(event.target as any)) setIsOpen(false);
    };
    window.addEventListener('click', handleRefClick);
    return () => window.removeEventListener('click', handleRefClick);
  }, [isOpen]);

  const handleSelect = (option: ListOption<T> | string) => {
    setIsOpen(false);
    if (isListOption(option)) onOptionChange?.(option);
    onStringChange?.(displayOption(option));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Space' || event.key === 'Enter') setIsOpen(!isOpen);
  };

  const handleClear = (event: MouseEvent<SVGElement>) => {
    event.stopPropagation();
    console.log('clear');
    onOptionChange?.(undefined);
    onStringChange?.(undefined);
  };

  return (
    <div ref={containerRef} className="relative grow">
      <div
        className={classNames('flex w-full items-center px-2 py-1 text-left hover:cursor-pointer', className)}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(event) => handleKeyDown(event)}
      >
        <div className="grow">{displayOption(selected)}</div>
        {isClearable && !!selected && (
          <>
            <MdClear className={classNames('h-6 w-6', iconClassName)} onClick={handleClear} />
            <div className="mx-2 h-6 border-r border-slate-400" />
          </>
        )}
        <MdKeyboardArrowDown className={classNames('h-6 w-6', iconClassName)} />
      </div>
      {isOpen && (
        <div
          className={classNames(
            'absolute top-full left-0 z-10 mt-1 max-h-[20rem] w-full overflow-auto rounded-md border border-slate-400 bg-slate-800',
            overlayClassName
          )}
        >
          {options.length === 0 ? (
            <span>Keine option verfügbar</span>
          ) : (
            options.map((option) => (
              <div
                key={getOptionKey(option)}
                className="w-full px-2 py-1 hover:cursor-pointer hover:bg-white/25"
                onClick={() => handleSelect(option)}
                onKeyDown={() => handleSelect(option)}
              >
                {displayOption(option)}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ListSelect;
