import { useState, useEffect } from 'react';

interface HumidityWidgetProps {
  initialHumidity?: number;
}

const HumidityWidget = ({ initialHumidity = 45 }: HumidityWidgetProps) => {
  const [humidity, setHumidity] = useState(initialHumidity);

  // Simulate humidity changes
  useEffect(() => {
    const interval = setInterval(() => {
      setHumidity(prevHumidity => {
        // Random fluctuation within ±5%
        const change = (Math.random() * 6 - 3);
        // Ensure humidity stays within reasonable bounds
        const newHumidity = Math.max(25, Math.min(80, prevHumidity + change));
        return Math.round(newHumidity);
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Determine humidity color
  const getHumidityColor = () => {
    if (humidity >= 70) return 'var(--accent-blue)';
    if (humidity >= 50) return 'var(--accent-green)';
    if (humidity >= 35) return 'var(--accent-yellow)';
    return 'var(--accent-orange)';
  };

  // Get humidity status
  const getHumidityStatus = () => {
    if (humidity >= 70) return 'Very Humid';
    if (humidity >= 50) return 'Humid';
    if (humidity >= 35) return 'Comfortable';
    return 'Dry';
  };

  return (
    <>
      <div className="widget-title">Humidity</div>
      <div className="widget-content">
        <div>
          <div>
            <div>
              {/* Circular background */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '3px solid white',
                boxSizing: 'border-box'
              }} />
              
              {/* Water drop icon in the middle */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '32px',
                color: getHumidityColor()
              }}>
                💧
              </div>
              
              {/* Circular progress indicator */}
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="6"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={getHumidityColor()}
                  strokeWidth="6"
                  strokeDasharray="339.292"
                  strokeDashoffset={339.292 * (1 - humidity / 100)}
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dashoffset 1s ease, stroke 1s ease' }}
                />
              </svg>
            </div>
            <div className="value-label">
              {getHumidityStatus()}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginRight: '20px' }}>
            <div className="value-text">
              {humidity}%
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HumidityWidget; 