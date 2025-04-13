import { useState, useEffect } from 'react';

interface SpeedWidgetProps {
  initialSpeed?: number; // km/h
}

const SpeedWidget = ({ initialSpeed = 0 }: SpeedWidgetProps) => {
  const [speed, setSpeed] = useState(initialSpeed);
  const [maxSpeed, setMaxSpeed] = useState(initialSpeed);

  // Simulate speed changes
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prevSpeed => {
        // Fluctuate speed to simulate real-world driving patterns
        let targetSpeed;
        
        // Randomly choose whether to accelerate, maintain, or slow down
        const behavior = Math.random();
        if (behavior < 0.3) {
          // Accelerate
          targetSpeed = prevSpeed + (Math.random() * 15);
        } else if (behavior < 0.6) {
          // Maintain approximate speed with minor fluctuations
          targetSpeed = prevSpeed + (Math.random() * 6 - 3);
        } else {
          // Slow down
          targetSpeed = prevSpeed - (Math.random() * 10);
        }
        
        // Ensure speed stays between 0 and 130
        const newSpeed = Math.max(0, Math.min(130, targetSpeed));
        
        // Update max speed if needed
        if (newSpeed > maxSpeed) {
          setMaxSpeed(newSpeed);
        }
        
        return newSpeed;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [maxSpeed]);

  // Calculate needle rotation (0 km/h = -120deg, 130 km/h = 120deg)
  const needleRotation = -120 + (speed / 130) * 240;
  
  // Get speed color based on value
  const getSpeedColor = () => {
    if (speed > 100) return 'var(--accent-red)';
    if (speed > 70) return 'var(--accent-orange)';
    if (speed > 30) return 'var(--accent-yellow)';
    return 'var(--accent-green)';
  };
  
  // Get status label
  const getSpeedLabel = () => {
    if (speed > 100) return 'Over speed limit';
    if (speed > 70) return 'Highway speed';
    if (speed > 30) return 'Urban driving';
    if (speed > 5) return 'Slow driving';
    return 'Stopped';
  };

  return (
    <>
      <div className="widget-title">Speed</div>
      <div className="widget-content">
        <div>
          <div>
            <div style={{ position: 'relative', height: '110px', display: 'flex', justifyContent: 'center' }}>
              <svg width="200" height="110" viewBox="0 0 200 120">
                {/* Speed gauge background */}
                <path
                  d="M 20,100 A 80,80 0 0,1 180,100"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="6"
                />
                
                {/* Speed markings */}
                {[...Array(7)].map((_, i) => {
                  const angle = -120 + i * 40;
                  const x1 = 100 + 75 * Math.cos(angle * Math.PI / 180);
                  const y1 = 100 + 75 * Math.sin(angle * Math.PI / 180);
                  const x2 = 100 + 85 * Math.cos(angle * Math.PI / 180);
                  const y2 = 100 + 85 * Math.sin(angle * Math.PI / 180);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
                
                {/* Speed labels */}
                <text x="25" y="105" fill="white" fontSize="12" textAnchor="middle">0</text>
                <text x="48" y="75" fill="white" fontSize="12" textAnchor="middle">20</text>
                <text x="80" y="52" fill="white" fontSize="12" textAnchor="middle">50</text>
                <text x="100" y="45" fill="white" fontSize="12" textAnchor="middle">70</text>
                <text x="120" y="52" fill="white" fontSize="12" textAnchor="middle">90</text>
                <text x="155" y="75" fill="white" fontSize="12" textAnchor="middle">110</text>
                <text x="175" y="105" fill="white" fontSize="12" textAnchor="middle">130</text>
                
                {/* Needle */}
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="30"
                  stroke={getSpeedColor()}
                  strokeWidth="3"
                  transform={`rotate(${needleRotation}, 100, 100)`}
                  style={{ transition: 'transform 0.5s ease, stroke 0.5s ease' }}
                />
                
                {/* Needle center */}
                <circle cx="100" cy="100" r="8" fill={getSpeedColor()} style={{ transition: 'fill 0.5s ease' }} />
                
                {/* Current speed */}
                <text x="100" y="85" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle">
                  {Math.round(speed)}
                </text>
              </svg>
            </div>
            <div className="value-label">
              {getSpeedLabel()}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginRight: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Max
            </div>
            <div className="value-text">
              {Math.round(maxSpeed)}
            </div>
            <div className="value-unit">km/h</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpeedWidget; 