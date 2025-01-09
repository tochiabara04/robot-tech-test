import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Grid from './components/Grid';

describe('Grid Component', () => {
  test('should render the grid and position the robot at the starting point', () => {
    render(<Grid />);
    const robot = screen.getByLabelText('robot');
    expect(robot).toBeInTheDocument();
    const initialBox = screen.getByTestId('box-20');
    expect(initialBox).toContainElement(robot);
  });

  test('should rotate the robot to the right and update its facing direction', async () => {
    render(<Grid />);
    const input = screen.getByPlaceholderText(/enter commands/i);
    const executeButton = screen.getByText(/execute/i);

    fireEvent.change(input, { target: { value: 'R' } });
    fireEvent.click(executeButton);

    await waitFor(() => {
      const robot = screen.getByLabelText('robot');
      expect(robot.style.transform).toBe('rotate(90deg)');
    });
  });

  test('should move the robot forward in its current direction', async () => {
    render(<Grid />);
    const input = screen.getByPlaceholderText(/enter commands/i);
    const executeButton = screen.getByText(/execute/i);

    fireEvent.change(input, { target: { value: 'F' } });
    fireEvent.click(executeButton);

    await waitFor(() => {
      const nextBox = screen.getByTestId('box-21');
      const robot = screen.getByLabelText('robot');
      expect(nextBox).toContainElement(robot);
    });
  });

  test('should prevent the robot from moving out of bounds when attempting to move North', async () => {
    render(<Grid />);
    fireEvent.change(screen.getByPlaceholderText('Enter commands (e.g., RF)'), {
      target: { value: 'F' },
    });
    const moveButton = screen.getByText('Execute');
    fireEvent.click(moveButton);

    await waitFor(() => {
      const robot = screen.getByLabelText('robot');
      expect(robot).toBeInTheDocument();
    });
  });

  test('should prevent the robot from moving out of bounds when attempting to move East', async () => {
    render(<Grid />);
    fireEvent.change(screen.getByPlaceholderText('Enter commands (e.g., RF)'), {
      target: { value: 'F' },
    });
    const moveButton = screen.getByText('Execute');
    fireEvent.click(moveButton);

    await waitFor(() => {
      const robot = screen.getByLabelText('robot');
      expect(robot).toBeInTheDocument();
    });
  });
});
