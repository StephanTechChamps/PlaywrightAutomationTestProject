import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrencySwitch from './CurrencySwitch';

describe('CurrencySwitch', () => {
  const mockSetCurrency = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows correct button and label for EUR', () => {
    render(<CurrencySwitch currency="EUR" setCurrency={mockSetCurrency} />);
    expect(screen.getByText('Switch to USD ($)')).toBeInTheDocument();
    expect(screen.getByText('Current: Euro   (€)')).toBeInTheDocument();
  });

  it('shows correct button and label for USD', () => {
    render(<CurrencySwitch currency="USD" setCurrency={mockSetCurrency} />);
    expect(screen.getByText('Switch to EUR (€)')).toBeInTheDocument();
    expect(screen.getByText('Current: Dollar ($)')).toBeInTheDocument();
  });

  it('calls setCurrency with USD when EUR button is clicked', () => {
    render(<CurrencySwitch currency="EUR" setCurrency={mockSetCurrency} />);
    fireEvent.click(screen.getByText('Switch to USD ($)'));
    expect(mockSetCurrency).toHaveBeenCalledWith('USD');
  });

  it('calls setCurrency with EUR when USD button is clicked', () => {
    render(<CurrencySwitch currency="USD" setCurrency={mockSetCurrency} />);
        fireEvent.click(screen.getByText('Switch to EUR (€)'));
      });
    });