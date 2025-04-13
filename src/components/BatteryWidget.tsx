import { useState, useEffect } from 'react';

interface BatteryWidgetProps {
  initialLevel?: number;
}

const BatteryWidget = ({ initialLevel = 75 }: BatteryWidgetProps) => {
  const [batteryLevel, setBatteryLevel] = useState(initialLevel);
  const [charging, setCharging] = useState(false);

  // Simulate battery changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly decide if charging or discharging
      const isCharging = Math.random() > 0.4;
      setCharging(isCharging);
      
      // Adjust battery level
      setBatteryLevel(prevLevel => {
        let newLevel = prevLevel;
        if (isCharging) {
          newLevel = Math.min(100, prevLevel + Math.random() * 2);
        } else {
          newLevel = Math.max(10, prevLevel - Math.random() * 1.5);
        }
        return Math.round(newLevel);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Determine battery color based on level
  const getBatteryColor = () => {
    if (batteryLevel > 50) return 'var(--accent-green)';
    if (batteryLevel > 20) return 'var(--accent-yellow)';
    return 'var(--accent-red)';
  };

  return (
    <div className="widget-content">
      <div>
        <div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '80px', 
                border: '3px solid white', 
                borderRadius: '12px', 
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: `${batteryLevel}%`,
                  backgroundColor: getBatteryColor(),
                  transition: 'height 1s ease, background-color 1s ease'
                }} />
                {charging && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '20px',
                    zIndex: 2,
                    color: batteryLevel > 50 ? 'black' : 'white'
                  }}>
                    ⚡
                  </div>
                )}
              </div>
              <div style={{ 
                height: '10px', 
                width: '5px', 
                backgroundColor: 'white', 
                marginLeft: '-1px',
                borderRadius: '0 3px 3px 0'
              }} />
            </div>
          </div>
          <div className="value-label">
            {charging ? 'Charging' : 'On Battery'}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginRight: '20px' }}>
          <div className="value-text">
            {batteryLevel}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryWidget; 