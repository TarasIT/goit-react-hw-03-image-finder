import PropTypes from 'prop-types';
import { LoadButton } from './Button.styled';

export const LoadMoreBtn = ({ onBtnClick }) => {
  return (
    <LoadButton type="button" onClick={onBtnClick}>
      Load more
    </LoadButton>
  );
};

LoadMoreBtn.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};
