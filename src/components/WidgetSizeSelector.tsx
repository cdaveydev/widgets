import { WidgetSize } from './WidgetTypes';

interface WidgetSizeSelectorProps {
  currentSize: WidgetSize;
  onSizeChange: (size: WidgetSize) => void;
}

const WidgetSizeSelector = ({ currentSize, onSizeChange }: WidgetSizeSelectorProps) => {
  const sizes: WidgetSize[] = ['small', 'medium', 'large', 'x-large'];
  
  return (
    <div className="widget-size-selector">
      {sizes.map(size => (
        <button 
          key={size}
          className={`size-option ${size} ${currentSize === size ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onSizeChange(size);
          }}
          aria-label={`Set widget to ${size} size`}
          title={`${size.charAt(0).toUpperCase() + size.slice(1)}`}
        >
          <div className="size-icon"></div>
        </button>
      ))}
    </div>
  );
};

export default WidgetSizeSelector; 