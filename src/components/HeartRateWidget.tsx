import { useState, useEffect } from 'react';

interface HeartRateWidgetProps {
  initialRate?: number;
}

const HeartRateWidget = ({ initialRate = 72 }: HeartRateWidgetProps) => {
  const [heartRate, setHeartRate] = useState(initialRate);
  const [isBeating, setIsBeating] = useState(false);

  // Simulate heart rate changes
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prevRate => {
        // Random fluctuation within ±5 bpm
        const change = (Math.random() * 10 - 5);
        // Ensure heart rate stays within reasonable bounds
        return Math.max(60, Math.min(120, prevRate + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate heartbeat animation
  useEffect(() => {
    const beatInterval = setInterval(() => {
      setIsBeating(true);
      const timeout = setTimeout(() => {
        setIsBeating(false);
      }, 200);
      
      return () => clearTimeout(timeout);
    }, 60000 / heartRate); // Convert bpm to ms interval

    return () => clearInterval(beatInterval);
  }, [heartRate]);

  // Determine heart rate color and status
  const getHeartRateColor = () => {
    if (heartRate >= 100) return 'var(--accent-red)';
    if (heartRate >= 85) return 'var(--accent-orange)';
    if (heartRate >= 70) return 'var(--accent-yellow)';
    return 'var(--accent-green)';
  };

  const getHeartRateStatus = () => {
    if (heartRate >= 100) return 'Elevated';
    if (heartRate >= 85) return 'Active';
    if (heartRate >= 70) return 'Normal';
    return 'Resting';
  };

  return (
    <div className="widget">
      <div className="widget-title">Heart Rate</div>
      <div className="widget-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              {/* Heart rate visualization */}
              <svg width="120" height="120" viewBox="0 0 120 120">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="6"
                />
                
                {/* Heart rate progress */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={getHeartRateColor()}
                  strokeWidth="6"
                  strokeDasharray="339.292"
                  strokeDashoffset={339.292 * (1 - ((heartRate - 60) / 60))}
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dashoffset 1s ease, stroke 1s ease' }}
                />
                
                {/* Animated heart icon */}
                <g transform="translate(60, 60) scale(0.5)">
                  <path 
                    d="M0,20 L-4,16 Q-20,-5 -20,-15 Q-20,-30 -6,-30 Q5,-30 0,-20 Q-5,-30 6,-30 Q20,-30 20,-15 Q20,-5 4,16 L0,20 Z" 
                    fill={getHeartRateColor()}
                    transform={`scale(${isBeating ? 1.2 : 1})`}
                    style={{ transition: 'transform 0.2s ease' }}
                  />
                </g>
                
                {/* EKG Line */}
                <path
                  d="M10,60 L30,60 L35,40 L45,80 L55,60 L60,60 L70,20 L80,100 L90,60 L110,60"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
              </svg>
            </div>
            <div className="value-label" style={{ marginTop: '8px' }}>
              {getHeartRateStatus()}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginRight: '20px' }}>
            <div className="value-text">
              {Math.round(heartRate)}
            </div>
            <div className="value-unit">bpm</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartRateWidget; 