import { FC, Fragment, PropsWithChildren } from 'react';

interface LoadingProps extends PropsWithChildren {
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
}

const Loading: FC<LoadingProps> = ({ isLoading, isError, children, error }) => {
  if (isLoading) return <span>Loading....</span>;

  return <Fragment>{children}</Fragment>;
};

export default Loading;
