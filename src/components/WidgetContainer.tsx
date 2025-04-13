import { useState, useEffect, ReactNode } from 'react';
import WidgetSizeSelector, { WidgetSize } from './WidgetSizeSelector';

interface WidgetContainerProps {
  initialSize?: WidgetSize;
  children: ReactNode;
  title?: string;
  id: string;
}

const WidgetContainer = ({ 
  initialSize = 'small', 
  children, 
  title,
  id
}: WidgetContainerProps) => {
  const [size, setSize] = useState<WidgetSize>(() => {
    // Try to load saved size preference from localStorage
    const savedSize = localStorage.getItem(`widget-size-${id}`);
    if (savedSize === 'small' || savedSize === 'medium' || savedSize === 'large') {
      return savedSize;
    }
    return initialSize;
  });

  // Save size preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(`widget-size-${id}`, size);
  }, [size, id]);

  const handleSizeChange = (newSize: WidgetSize) => {
    setSize(newSize);
  };

  return (
    <div className={`widget ${size}`}>
      {title && <div className="widget-title">{title}</div>}
      {children}
      <WidgetSizeSelector 
        currentSize={size} 
        onChange={handleSizeChange} 
      />
    </div>
  );
};

export default WidgetContainer; 