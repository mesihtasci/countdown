import { render, fireEvent } from '@testing-library/react';
import Button from '../components/button/Button';

test('renders button correctly with provided props', () => {
  const { getByText } = render(<Button tabIndex={0}>Click me</Button>);
  expect(getByText('Click me')).toBeInTheDocument();
  expect(getByText('Click me')).toHaveAttribute('tabindex', '0');
});

test('calls onClick event handler when button is clicked', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
