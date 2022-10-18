import PropTypes from 'prop-types';
import { FilterInput, FilterLabel } from './Filter.styled';

export const Filter = ({ value, onChange }) => (
  <FilterLabel>
    Find contacts by name
    <FilterInput type="text" value={value} onChange={onChange} />
  </FilterLabel>
);

Filter.protTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
