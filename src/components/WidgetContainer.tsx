import { ReactNode, useState, useEffect } from 'react';
import WidgetSizeSelector from './WidgetSizeSelector';

export type WidgetSize = 'small' | 'medium' | 'large' | 'x-large';

interface WidgetContainerProps {
  children: ReactNode;
  initialSize?: WidgetSize;
  id: string;
}

const WidgetContainer = ({ 
  children, 
  initialSize = 'small',
  id
}: WidgetContainerProps) => {
  // Try to get saved size from localStorage first
  const getSavedSize = (): WidgetSize => {
    try {
      const saved = localStorage.getItem(`widget_size_${id}`);
      return saved as WidgetSize || initialSize;
    } catch (e) {
      return initialSize;
    }
  };

  const [size, setSize] = useState<WidgetSize>(getSavedSize());
  const [isHovering, setIsHovering] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  
  // Save size to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(`widget_size_${id}`, size);
    } catch (e) {
      console.warn('Failed to save widget size to localStorage', e);
    }
  }, [size, id]);
  
  // Show selector after a short delay when hovering to prevent accidental triggers
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isHovering) {
      timer = setTimeout(() => {
        setShowSelector(true);
      }, 300);
    } else {
      setShowSelector(false);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isHovering]);

  const handleSizeChange = (newSize: WidgetSize) => {
    setSize(newSize);
  };
  
  return (
    <div 
      className={`widget ${size}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {showSelector && (
        <WidgetSizeSelector 
          currentSize={size} 
          onSizeChange={handleSizeChange}
        />
      )}
      {children}
    </div>
  );
};

export default WidgetContainer; 