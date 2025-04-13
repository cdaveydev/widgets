import { useState, useEffect } from 'react';
import tmobileSvg from '../assets/t-mobile-1.svg';
import attSvg from '../assets/at-t-5.svg';

interface CellSignalWidgetProps {
  initialStrength?: number;
  initialCarrier?: 'T-Mobile' | 'AT&T';
}

const CellSignalWidget = ({ 
  initialStrength = -85, 
  initialCarrier = 'T-Mobile' 
}: CellSignalWidgetProps) => {
  const [signalStrength, setSignalStrength] = useState(initialStrength);
  const [carrier, setCarrier] = useState<'T-Mobile' | 'AT&T'>(initialCarrier);
  const [isRoaming, setIsRoaming] = useState(false);

  // Signal ranges in dBm
  // Excellent: > -70dBm
  // Good: -70dBm to -85dBm
  // Fair: -86dBm to -100dBm
  // Poor: < -100dBm

  // Simulate signal strength changes
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(prev => {
        // Random fluctuation within ±10 dBm
        const change = Math.random() * 20 - 10;
        return Math.max(-110, Math.min(-60, prev + change));
      });

      // Occasionally switch carriers (20% chance for testing purposes)
      if (Math.random() < 0.2) {
        setCarrier(prev => prev === 'T-Mobile' ? 'AT&T' : 'T-Mobile');
      }

      // Occasionally toggle roaming (10% chance for testing purposes)
      if (Math.random() < 0.1) {
        setIsRoaming(prev => !prev);
      }
    }, 3000); // Shorter interval for testing

    return () => clearInterval(interval);
  }, []);

  // Calculate number of bars based on signal strength
  const getSignalBars = () => {
    if (signalStrength > -70) return 5;
    if (signalStrength > -80) return 4;
    if (signalStrength > -90) return 3;
    if (signalStrength > -100) return 2;
    return 1;
  };

  // Get signal quality description
  const getSignalQuality = () => {
    if (signalStrength > -70) return 'Excellent';
    if (signalStrength > -85) return 'Good';
    if (signalStrength > -100) return 'Fair';
    return 'Poor';
  };

  // Get color based on signal strength
  const getSignalColor = () => {
    if (signalStrength > -70) return 'var(--accent-green)';
    if (signalStrength > -85) return 'var(--accent-blue)';
    if (signalStrength > -100) return 'var(--accent-yellow)';
    return 'var(--accent-red)';
  };

  const bars = getSignalBars();

  return (
    <div className="widget-content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ 
            position: 'relative', 
            width: '120px', 
            height: '110px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'space-between'
          }}>
            {/* Carrier logo */}
            <div style={{ 
              height: '50px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginTop: '5px',
              padding: '5px'
            }}>
              <img 
                src={carrier === 'T-Mobile' ? tmobileSvg : attSvg} 
                alt={carrier} 
                style={{ 
                  maxWidth: '90px',
                  maxHeight: '40px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain'
                }} 
              />
            </div>
            
            {/* Signal bars */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-end', 
              height: '45px', 
              justifyContent: 'center',
              gap: '3px',
              marginBottom: '5px'
            }}>
              {[1, 2, 3, 4, 5].map(bar => (
                <div
                  key={bar}
                  style={{
                    width: '10px',
                    height: `${bar * 8}px`,
                    backgroundColor: bar <= bars ? getSignalColor() : 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '1px',
                    transition: 'background-color 0.5s ease, height 0.5s ease'
                  }}
                />
              ))}
            </div>
            
            {/* Roaming indicator */}
            {isRoaming && (
              <div style={{ 
                position: 'absolute', 
                top: '5px', 
                right: '5px', 
                fontSize: '12px',
                color: 'var(--accent-orange)',
                fontWeight: 'bold'
              }}>
                R
              </div>
            )}
          </div>
          <div className="value-label">
            {getSignalQuality()}{isRoaming ? ' (Roaming)' : ''}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginRight: '20px' }}>
          <div className="value-text">
            {Math.round(signalStrength)}
          </div>
          <div className="value-unit">dBm</div>
        </div>
      </div>
    </div>
  );
};

export default CellSignalWidget; 