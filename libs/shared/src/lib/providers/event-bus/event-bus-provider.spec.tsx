import { render } from '@testing-library/react';
import { EventBusProvider, useEventBus } from './event-bus-provider';

const mockEventBus = {
  publish: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
};

const TestComponent = () => {
  const eventBus = useEventBus();
  return (
    <div data-testid='event-bus'>
      {eventBus ? 'eventBus found' : 'eventBus not found'}
    </div>
  );
};

describe('EventBusProvider', () => {
  it('should provide the event bus to the children', () => {
    const { getByText } = render(
      <EventBusProvider eventBus={mockEventBus}>
        <TestComponent />
      </EventBusProvider>,
    );
    expect(getByText('eventBus found')).toBeTruthy();
  });

  it('should throws error when useEventBus is used outside EventBusProvider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useEventBus must be used within an EventBusProvider');

    consoleError.mockRestore();
  });
});
