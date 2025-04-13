import { useState, useEffect } from 'react';

interface HeatZone {
  id: string;
  temperature: number;
  path: string;
  label: string;
}

interface HeatMapWidgetProps {
  initialTemp?: number;
}

const HeatMapWidget = ({ initialTemp = 98.6 }: HeatMapWidgetProps) => {
  const [coreTemp, setCoreTemp] = useState(initialTemp);
  const [heatZones, setHeatZones] = useState<HeatZone[]>([
    { 
      id: 'head', 
      temperature: initialTemp + 0.2, 
      path: 'M50,20 C58,20 65,28 65,36 C65,48 58,56 50,56 C42,56 35,48 35,36 C35,28 42,20 50,20 Z', 
      label: 'Head'
    },
    { 
      id: 'chest', 
      temperature: initialTemp + 0.5, 
      path: 'M38,56 L62,56 L62,80 L38,80 Z', 
      label: 'Chest'
    },
    { 
      id: 'abdomen', 
      temperature: initialTemp - 0.2, 
      path: 'M38,80 L62,80 L62,100 L38,100 Z', 
      label: 'Abdomen'
    },
    { 
      id: 'leftArm', 
      temperature: initialTemp - 1.5, 
      path: 'M38,56 L30,56 L23,85 L30,85 L38,80 Z', 
      label: 'Left Arm'
    },
    { 
      id: 'rightArm', 
      temperature: initialTemp - 1.5, 
      path: 'M62,56 L70,56 L77,85 L70,85 L62,80 Z', 
      label: 'Right Arm'
    },
    { 
      id: 'leftLeg', 
      temperature: initialTemp - 2, 
      path: 'M38,100 L46,100 L46,140 L38,140 Z', 
      label: 'Left Leg'
    },
    { 
      id: 'rightLeg', 
      temperature: initialTemp - 2, 
      path: 'M54,100 L62,100 L62,140 L54,140 Z', 
      label: 'Right Leg'
    }
  ]);
  
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [zoneTemps, setZoneTemps] = useState<{[key: string]: number[]}>({});

  // Simulate temperature changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Update core temperature
      setCoreTemp(prevTemp => {
        const change = (Math.random() * 0.6 - 0.3);
        return parseFloat((prevTemp + change).toFixed(1));
      });
      
      // Update individual zone temperatures
      setHeatZones(prevZones => 
        prevZones.map(zone => {
          const change = (Math.random() * 0.8 - 0.4);
          const newTemp = parseFloat((zone.temperature + change).toFixed(1));
          
          // Store temperature history for each zone
          setZoneTemps(prev => {
            const zoneTempHistory = prev[zone.id] || [];
            const newHistory = [...zoneTempHistory, newTemp].slice(-20); // Keep last 20 readings
            return {
              ...prev,
              [zone.id]: newHistory
            };
          });
          
          return {
            ...zone,
            temperature: newTemp
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get color based on temperature
  const getTemperatureColor = (temp: number) => {
    const normalTemp = 98.6;
    const diff = temp - normalTemp;
    
    if (diff > 2) return 'rgb(255, 59, 48)'; // Very hot
    if (diff > 1) return 'rgb(255, 149, 0)'; // Hot
    if (diff > 0) return 'rgb(255, 204, 0)'; // Warm
    if (diff > -1) return 'rgb(120, 120, 128)'; // Normal
    if (diff > -2) return 'rgb(52, 199, 89)'; // Cool
    return 'rgb(0, 122, 255)'; // Cold
  };

  // Get temperature description
  const getTemperatureDesc = (temp: number) => {
    const normalTemp = 98.6;
    const diff = temp - normalTemp;
    
    if (diff > 2) return 'Very Hot';
    if (diff > 1) return 'Hot';
    if (diff > 0) return 'Warm';
    if (diff > -1) return 'Normal';
    if (diff > -2) return 'Cool';
    return 'Cold';
  };

  // Get selected zone information
  const getSelectedZoneInfo = () => {
    if (!selectedZone) return { temp: coreTemp, label: 'Core' };
    const zone = heatZones.find(z => z.id === selectedZone);
    return zone ? { temp: zone.temperature, label: zone.label } : { temp: coreTemp, label: 'Core' };
  };

  const { temp, label } = getSelectedZoneInfo();
  
  // Function to render temperature history chart for selected zone
  const renderTempHistoryChart = () => {
    if (!selectedZone || !zoneTemps[selectedZone] || zoneTemps[selectedZone].length < 2) return null;
    
    const temps = zoneTemps[selectedZone];
    const minTemp = Math.min(...temps) - 0.5;
    const maxTemp = Math.max(...temps) + 0.5;
    const range = maxTemp - minTemp || 1;
    
    const chartWidth = 200;
    const chartHeight = 80;
    
    return (
      <div style={{ marginTop: '20px', width: '100%' }}>
        <div style={{ fontSize: '14px', marginBottom: '5px', textAlign: 'center' }}>
          Temperature History ({label})
        </div>
        <svg width={chartWidth} height={chartHeight} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
          <rect width={chartWidth} height={chartHeight} fill="rgba(255,255,255,0.05)" rx="5" />
          
          {/* Temp points and connecting lines */}
          <polyline 
            points={temps.map((t, i) => `${(i / (temps.length - 1)) * chartWidth}, ${chartHeight - ((t - minTemp) / range) * chartHeight * 0.8 - 10}`).join(' ')}
            stroke={getTemperatureColor(temps[temps.length - 1])}
            strokeWidth="2"
            fill="none"
          />
          
          {temps.map((t, i) => (
            <circle
              key={i}
              cx={(i / (temps.length - 1)) * chartWidth}
              cy={chartHeight - ((t - minTemp) / range) * chartHeight * 0.8 - 10}
              r="3"
              fill={getTemperatureColor(t)}
            />
          ))}
          
          {/* Baseline */}
          <line
            x1="0"
            y1={chartHeight - ((98.6 - minTemp) / range) * chartHeight * 0.8 - 10}
            x2={chartWidth}
            y2={chartHeight - ((98.6 - minTemp) / range) * chartHeight * 0.8 - 10}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          
          {/* Reference text */}
          <text
            x={chartWidth - 30}
            y={chartHeight - ((98.6 - minTemp) / range) * chartHeight * 0.8 - 15}
            fill="rgba(255,255,255,0.5)"
            fontSize="10"
          >
            98.6°F
          </text>
        </svg>
      </div>
    );
  };

  return (
    <>
      <div className="widget-title">Body Heat Map</div>
      <div className="widget-content">
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="150" height="200" viewBox="0 0 100 160">
                  {/* Body heat zones */}
                  {heatZones.map(zone => (
                    <path
                      key={zone.id}
                      d={zone.path}
                      fill={getTemperatureColor(zone.temperature)}
                      stroke="rgba(255, 255, 255, 0.5)"
                      strokeWidth="1"
                      onClick={() => setSelectedZone(zone.id)}
                      style={{ 
                        cursor: 'pointer', 
                        transition: 'fill 1s ease',
                        filter: selectedZone === zone.id ? 'brightness(1.3)' : 'none',
                        strokeWidth: selectedZone === zone.id ? '2' : '1'
                      }}
                    />
                  ))}
                  
                  {/* Body outline */}
                  <path
                    d="M50,20 C58,20 65,28 65,36 C65,48 58,56 50,56 C42,56 35,48 35,36 C35,28 42,20 50,20 Z
                       M38,56 L62,56 L62,80 L38,80 Z
                       M38,80 L62,80 L62,100 L38,100 Z
                       M38,56 L30,56 L23,85 L30,85 L38,80 Z
                       M62,56 L70,56 L77,85 L70,85 L62,80 Z
                       M38,100 L46,100 L46,140 L38,140 Z
                       M54,100 L62,100 L62,140 L54,140 Z"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="0.5"
                    pointerEvents="none"
                  />
                </svg>
              </div>
              <div className="value-label">
                {label}: {getTemperatureDesc(temp)}
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginRight: '20px' }}>
              <div className="value-text">
                {temp}°F
              </div>
              <div className="value-unit">{getTemperatureDesc(temp)}</div>
              
              {/* Instructions */}
              <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '15px', maxWidth: '140px', textAlign: 'left' }}>
                Tap on a body part to select it and view its temperature
              </div>
            </div>
          </div>
          
          {/* Temperature history chart for larger sizes */}
          {renderTempHistoryChart()}
        </div>
      </div>
    </>
  );
};

export default HeatMapWidget; 