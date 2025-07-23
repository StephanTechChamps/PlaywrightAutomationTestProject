import React from 'react';
import type { Currency } from '../types';

interface CurrencySwitchProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const CurrencySwitch: React.FC<CurrencySwitchProps> = ({ currency, setCurrency }) => {
  const buttonText = currency === 'EUR' ? 'Switch to USD ($)' : 'Switch to EUR (€)';
  const labelText = currency === 'EUR' ? 'Current: Euro   (€)' : 'Current: Dollar ($)';
  return (
    <div style={{ marginTop: 32, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button
        onClick={() => setCurrency(currency === 'EUR' ? 'USD' : 'EUR')}
        style={{ padding: '4px 12px', borderRadius: 6, border: 'none', background: '#fafafa', cursor: 'pointer', width: 160, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}
      >
        {buttonText}
      </button>
      <span style={{ color: '#888', fontSize: 14, marginLeft: 16, fontVariantNumeric: 'tabular-nums' }}>{labelText}</span>
    </div>
  );
};

export default CurrencySwitch; 