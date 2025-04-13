import { useState, useEffect } from 'react';

interface GarbageWidgetProps {
  initialLevel?: number;
}

const GarbageWidget = ({ initialLevel = 60 }: GarbageWidgetProps) => {
  const [fillLevel, setFillLevel] = useState(initialLevel);

  // Simulate garbage level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setFillLevel(prevLevel => {
        // Garbage level generally increases over time
        const change = Math.random() * 3;
        // Simulate garbage collection when full
        if (prevLevel > 90) {
          return Math.max(0, Math.min(10, Math.random() * 10));
        }
        return Math.min(100, prevLevel + change);
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Determine garbage level color
  const getColor = () => {
    if (fillLevel > 80) return 'var(--accent-red)';
    if (fillLevel > 50) return 'var(--accent-orange)';
    if (fillLevel > 30) return 'var(--accent-yellow)';
    return 'var(--accent-green)';
  };

  // Get status label
  const getStatusLabel = () => {
    if (fillLevel > 80) return 'Need emptying';
    if (fillLevel > 50) return 'Getting full';
    if (fillLevel > 30) return 'Normal level';
    return 'Recently emptied';
  };

  return (
    <>
      <div className="widget-title">Garbage Level</div>
      <div className="widget-content">
        <div>
          <div>
            <div>
              <div style={{ 
                position: 'relative', 
                width: '80px',
                height: '100px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                {/* Trash can body */}
                <div style={{
                  position: 'relative',
                  width: '80px',
                  height: '100px',
                  borderRadius: '5px 5px 15px 15px',
                  border: '3px solid white',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }}>
                  {/* Trash can fill */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: `${fillLevel}%`,
                    backgroundColor: getColor(),
                    transition: 'height 1s ease, background-color 1s ease'
                  }} />
                  
                  {/* Trash can "ridges" */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '25%', 
                    width: '100%', 
                    height: '2px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.3)' 
                  }} />
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    width: '100%', 
                    height: '2px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.3)' 
                  }} />
                  <div style={{ 
                    position: 'absolute', 
                    top: '75%', 
                    width: '100%', 
                    height: '2px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.3)' 
                  }} />
                </div>
                
                {/* Trash can lid */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90px',
                  height: '12px',
                  borderRadius: '5px',
                  border: '3px solid white',
                  boxSizing: 'border-box',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }} />
              </div>
            </div>
            <div className="value-label">
              {getStatusLabel()}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginRight: '20px' }}>
            <div className="value-text">
              {Math.round(fillLevel)}%
            </div>
            <div className="value-unit">full</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GarbageWidget; 