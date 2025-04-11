import { useState, useEffect } from 'react';

interface SpeedWidgetProps {
  initialSpeed?: number;
  maxSpeed?: number;
  unit?: string;
}

const SpeedWidget = ({ 
  initialSpeed = 45, 
  maxSpeed = 120, 
  unit = 'mph' 
}: SpeedWidgetProps) => {
  const [speed, setSpeed] = useState(initialSpeed);

  // Simulate speed changes
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prevSpeed => {
        // Random speed change with some momentum
        const direction = Math.random() > 0.5 ? 1 : -1;
        const magnitude = Math.random() * 8;
        // Ensure speed stays within bounds
        return Math.max(0, Math.min(maxSpeed, prevSpeed + (direction * magnitude)));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [maxSpeed]);

  // Convert speed to an angle for the needle (0 speed = 180 degrees, max speed = 0 degrees)
  const speedAngle = 180 - (speed / maxSpeed * 180);
  
  // Determine speed color based on percentage of max
  const getSpeedColor = () => {
    const speedPercentage = speed / maxSpeed;
    if (speedPercentage > 0.85) return 'var(--accent-red)';
    if (speedPercentage > 0.6) return 'var(--accent-orange)';
    if (speedPercentage > 0.3) return 'var(--accent-yellow)';
    return 'var(--accent-green)';
  };

  return (
    <div className="widget">
      <div className="widget-title">Speed</div>
      <div className="widget-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
              position: 'relative', 
              width: '140px', 
              height: '80px',
              overflow: 'hidden'
            }}>
              {/* Speedometer background */}
              <div style={{
                position: 'absolute',
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                border: '3px solid white',
                boxSizing: 'border-box',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                top: '0px'
              }} />
              
              {/* Speed markers */}
              <svg width="140" height="80" viewBox="0 0 140 80" style={{ position: 'absolute', top: 0 }}>
                {/* Background arc */}
                <path
                  d="M10,70 A60,60 0 0,1 130,70"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="6"
                />
                
                {/* Colored speed arc */}
                <path
                  d="M10,70 A60,60 0 0,1 130,70"
                  fill="none"
                  stroke={getSpeedColor()}
                  strokeWidth="6"
                  strokeDasharray="188.5"
                  strokeDashoffset={188.5 * (1 - speed / maxSpeed)}
                  style={{ transition: 'stroke-dashoffset 1s ease, stroke 1s ease' }}
                />
                
                {/* Tick marks */}
                <g stroke="white" strokeWidth="1">
                  <line x1="20" y1="63" x2="20" y2="68" />
                  <line x1="44" y1="45" x2="46" y2="49" />
                  <line x1="70" y1="38" x2="70" y2="43" />
                  <line x1="96" y1="45" x2="94" y2="49" />
                  <line x1="120" y1="63" x2="120" y2="68" />
                </g>
                
                {/* Speed numbers */}
                <text x="15" y="58" fill="white" fontSize="8" textAnchor="middle">0</text>
                <text x="42" y="39" fill="white" fontSize="8" textAnchor="middle">{maxSpeed * 0.25}</text>
                <text x="70" y="32" fill="white" fontSize="8" textAnchor="middle">{maxSpeed * 0.5}</text>
                <text x="98" y="39" fill="white" fontSize="8" textAnchor="middle">{maxSpeed * 0.75}</text>
                <text x="125" y="58" fill="white" fontSize="8" textAnchor="middle">{maxSpeed}</text>
              </svg>
              
              {/* Needle */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '70px',
                width: '4px',
                height: '50px',
                backgroundColor: 'white',
                transformOrigin: 'bottom center',
                transform: `rotate(${speedAngle}deg)`,
                borderRadius: '4px 4px 0 0',
                transition: 'transform 0.5s ease-out'
              }} />
              
              {/* Center cap */}
              <div style={{
                position: 'absolute',
                bottom: '6px',
                left: '66px',
                width: '12px',
                height: '12px',
                backgroundColor: 'white',
                borderRadius: '50%'
              }} />
            </div>
            <div className="value-label" style={{ marginTop: '8px' }}>
              {unit}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginRight: '20px' }}>
            <div className="value-text">
              {Math.round(speed)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedWidget; 