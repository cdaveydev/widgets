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
      path: 'M50,30 C60,30 70,40 70,50 C70,65 60,75 50,75 C40,75 30,65 30,50 C30,40 40,30 50,30 Z', 
      label: 'Head'
    },
    { 
      id: 'chest', 
      temperature: initialTemp + 0.5, 
      path: 'M35,75 L65,75 L65,105 L35,105 Z', 
      label: 'Chest'
    },
    { 
      id: 'abdomen', 
      temperature: initialTemp - 0.2, 
      path: 'M35,105 L65,105 L65,130 L35,130 Z', 
      label: 'Abdomen'
    },
    { 
      id: 'leftArm', 
      temperature: initialTemp - 1.5, 
      path: 'M35,75 L25,75 L15,115 L25,115 L35,105 Z', 
      label: 'Left Arm'
    },
    { 
      id: 'rightArm', 
      temperature: initialTemp - 1.5, 
      path: 'M65,75 L75,75 L85,115 L75,115 L65,105 Z', 
      label: 'Right Arm'
    },
    { 
      id: 'leftLeg', 
      temperature: initialTemp - 2, 
      path: 'M35,130 L45,130 L45,180 L35,180 Z', 
      label: 'Left Leg'
    },
    { 
      id: 'rightLeg', 
      temperature: initialTemp - 2, 
      path: 'M55,130 L65,130 L65,180 L55,180 Z', 
      label: 'Right Leg'
    }
  ]);
  
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

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
          return {
            ...zone,
            temperature: parseFloat((zone.temperature + change).toFixed(1))
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

  return (
    <div className="widget">
      <div className="widget-title">Body Heat Map</div>
      <div className="widget-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '180px' }}>
              <svg width="120" height="180" viewBox="0 0 100 200">
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
                  d="M50,30 C60,30 70,40 70,50 C70,65 60,75 50,75 C40,75 30,65 30,50 C30,40 40,30 50,30 Z
                     M35,75 L65,75 L65,105 L35,105 Z
                     M35,105 L65,105 L65,130 L35,130 Z
                     M35,75 L25,75 L15,115 L25,115 L35,105 Z
                     M65,75 L75,75 L85,115 L75,115 L65,105 Z
                     M35,130 L45,130 L45,180 L35,180 Z
                     M55,130 L65,130 L65,180 L55,180 Z"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="0.5"
                  pointerEvents="none"
                />
              </svg>
            </div>
            <div className="value-label" style={{ marginTop: '8px' }}>
              {label}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginRight: '20px' }}>
            <div className="value-text">
              {temp}°F
            </div>
            <div className="value-unit">{getTemperatureDesc(temp)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMapWidget; 