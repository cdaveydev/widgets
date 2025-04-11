import { useState, useEffect } from 'react';

interface TemperatureWidgetProps {
  initialTemp?: number;
  unit?: 'C' | 'F';
}

const TemperatureWidget = ({ initialTemp = 22, unit = 'F' }: TemperatureWidgetProps) => {
  const [temperature, setTemperature] = useState(initialTemp);

  // Simulate temperature changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prevTemp => {
        // Random fluctuation within ±1.5 degrees
        const change = (Math.random() * 3 - 1.5);
        // Ensure temperature stays within reasonable bounds
        const newTemp = Math.max(10, Math.min(35, prevTemp + change));
        return parseFloat(newTemp.toFixed(1));
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Convert Celsius to Fahrenheit if needed
  const displayTemp = unit === 'F' ? (temperature * 9/5) + 32 : temperature;
  
  // Calculate fill level (mapping 10°C-35°C to 0-100%)
  const minTemp = 10;
  const maxTemp = 35;
  const fillPercentage = Math.min(100, Math.max(0, ((temperature - minTemp) / (maxTemp - minTemp)) * 100));
  
  // Determine temperature color
  const getTemperatureColor = () => {
    if (temperature >= 30) return 'var(--accent-red)';
    if (temperature >= 25) return 'var(--accent-orange)';
    if (temperature >= 20) return 'var(--accent-yellow)';
    if (temperature >= 15) return 'var(--accent-green)';
    return 'var(--accent-blue)';
  };

  // Get temperature status based on Celsius value (underlying calculation)
  const getTemperatureStatus = () => {
    if (temperature >= 30) return 'Very Hot';
    if (temperature >= 25) return 'Hot';
    if (temperature >= 20) return 'Comfortable';
    if (temperature >= 15) return 'Cool';
    return 'Cold';
  };

  return (
    <div className="widget">
      <div className="widget-title">Temperature</div>
      <div className="widget-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              {/* Thermometer bulb */}
              <div style={{ 
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: getTemperatureColor(),
                marginBottom: '-5px',
                zIndex: 2,
                border: '2px solid white'
              }} />
              
              {/* Thermometer stem */}
              <div style={{
                position: 'relative',
                width: '14px',
                height: '120px',
                borderRadius: '7px 7px 0 0',
                overflow: 'hidden',
                border: '2px solid white',
                borderBottom: 'none',
                marginLeft: '-13px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: `${fillPercentage}%`,
                  backgroundColor: getTemperatureColor(),
                  transition: 'height 1s ease, background-color 1s ease'
                }} />
                
                {/* Temperature markers */}
                <div style={{ position: 'absolute', top: '10%', right: '2px', width: '4px', height: '1px', backgroundColor: 'white' }} />
                <div style={{ position: 'absolute', top: '30%', right: '2px', width: '4px', height: '1px', backgroundColor: 'white' }} />
                <div style={{ position: 'absolute', top: '50%', right: '2px', width: '4px', height: '1px', backgroundColor: 'white' }} />
                <div style={{ position: 'absolute', top: '70%', right: '2px', width: '4px', height: '1px', backgroundColor: 'white' }} />
                <div style={{ position: 'absolute', top: '90%', right: '2px', width: '4px', height: '1px', backgroundColor: 'white' }} />
              </div>
            </div>
            <div className="value-label" style={{ marginTop: '8px' }}>
              {getTemperatureStatus()}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginRight: '20px' }}>
            <div className="value-text">
              {displayTemp.toFixed(1)}°{unit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureWidget; 