import { useState } from 'react';

export type WidgetSize = 'small' | 'medium' | 'large';

interface WidgetSizeSelectorProps {
  currentSize: WidgetSize;
  onChange: (size: WidgetSize) => void;
}

const WidgetSizeSelector = ({ currentSize, onChange }: WidgetSizeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSizeChange = (size: WidgetSize) => {
    onChange(size);
    setIsOpen(false);
  };

  const sizeIcons = {
    small: '□',
    medium: '▢',
    large: '■'
  };

  return (
    <div style={{ 
      position: 'absolute', 
      top: '12px', 
      right: '12px', 
      zIndex: 10 
    }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        title="Change widget size"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontSize: '16px',
          opacity: 0.7,
          transition: 'opacity 0.2s ease',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          backdropFilter: 'blur(4px)',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
      >
        {sizeIcons[currentSize]}
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '30px',
          right: '0',
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '8px',
          padding: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--widget-border)',
          minWidth: '80px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {(['small', 'medium', 'large'] as WidgetSize[]).map(size => (
              <button 
                key={size}
                onClick={() => handleSizeChange(size)}
                style={{
                  background: currentSize === size ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  textAlign: 'left',
                  fontSize: '12px',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ fontSize: '14px' }}>{sizeIcons[size]}</span> {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetSizeSelector; 