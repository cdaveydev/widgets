import { useState, useEffect } from 'react';

interface OxygenLevelWidgetProps {
  initialLevel?: number;
}

const OxygenLevelWidget = ({ initialLevel = 98 }: OxygenLevelWidgetProps) => {
  const [oxygenLevel, setOxygenLevel] = useState(initialLevel);
  const [pulsing, setPulsing] = useState(false);

  // Simulate oxygen level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setOxygenLevel(prevLevel => {
        // Random fluctuation within ±2%
        const change = (Math.random() * 4 - 2) * 0.1;
        // Ensure oxygen level stays within reasonable bounds
        return Math.max(90, Math.min(100, prevLevel + change));
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Simulate pulse animation
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulsing(true);
      const timeout = setTimeout(() => {
        setPulsing(false);
      }, 300);
      
      return () => clearTimeout(timeout);
    }, 3000);

    return () => clearInterval(pulseInterval);
  }, []);

  // Determine oxygen level color
  const getOxygenLevelColor = () => {
    if (oxygenLevel >= 95) return 'var(--accent-blue)';
    if (oxygenLevel >= 90) return 'var(--accent-yellow)';
    return 'var(--accent-red)';
  };

  // Get status label
  const getOxygenStatus = () => {
    if (oxygenLevel >= 95) return 'Normal';
    if (oxygenLevel >= 90) return 'Slightly Low';
    return 'Low';
  };

  // Calculate fill percentage (mapping 90-100% to 0-100%)
  const fillPercentage = Math.min(100, Math.max(0, (oxygenLevel - 90) * 10));

  return (
    <>
      <div className="widget-title">Oxygen Level</div>
      <div className="widget-content">
        <div>
          <div>
            <div>
              <svg width="110" height="110" viewBox="0 0 120 120">
                {/* Oxygen level gauge background */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="339.292"
                  strokeDashoffset="84.823" // 339.292 * 0.25 to show only 3/4 of the circle
                  transform="rotate(-135 60 60)"
                />
                
                {/* Oxygen level gauge fill */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={getOxygenLevelColor()}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="339.292"
                  strokeDashoffset={339.292 * (1 - fillPercentage / 100) * 0.75 + 84.823}
                  transform="rotate(-135 60 60)"
                  style={{ transition: 'stroke-dashoffset 1s ease, stroke 1s ease' }}
                />
                
                {/* Oxygen molecule icon */}
                <g 
                  transform={`translate(60, 60) scale(${pulsing ? 1.1 : 1})`}
                  style={{ transition: 'transform 0.3s ease' }}
                >
                  <circle
                    cx="0"
                    cy="-10"
                    r="15"
                    fill="none"
                    stroke={getOxygenLevelColor()}
                    strokeWidth="4"
                  />
                  <circle
                    cx="-13"
                    cy="10"
                    r="15"
                    fill="none"
                    stroke={getOxygenLevelColor()}
                    strokeWidth="4"
                  />
                  <circle
                    cx="13"
                    cy="10"
                    r="15"
                    fill="none"
                    stroke={getOxygenLevelColor()}
                    strokeWidth="4"
                  />
                  <text
                    x="0"
                    y="-7"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={getOxygenLevelColor()}
                    fontSize="14"
                    fontWeight="bold"
                  >
                    O
                  </text>
                  <text
                    x="7"
                    y="-3"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={getOxygenLevelColor()}
                    fontSize="10"
                  >
                    2
                  </text>
                </g>
              </svg>
            </div>
            <div className="value-label">
              {getOxygenStatus()}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginRight: '20px' }}>
            <div className="value-text">
              {oxygenLevel.toFixed(1)}%
            </div>
            <div className="value-unit">SpO₂</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OxygenLevelWidget; 