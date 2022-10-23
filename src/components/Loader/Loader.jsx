import { ThreeDots } from 'react-loader-spinner';
import { Preloader } from './Loader.styled';

export const Loader = () => {
  return (
    <Preloader>
      <ThreeDots color="gray" />
    </Preloader>
  );
};
