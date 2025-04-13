import './styles/Dashboard.css'
import BatteryWidget from './components/BatteryWidget'
import TemperatureWidget from './components/TemperatureWidget'
import HumidityWidget from './components/HumidityWidget'
import GarbageWidget from './components/GarbageWidget'
import SpeedWidget from './components/SpeedWidget'
import HeartRateWidget from './components/HeartRateWidget'
import OxygenLevelWidget from './components/OxygenLevelWidget'
import HeatMapWidget from './components/HeatMapWidget'
import CellSignalWidget from './components/CellSignalWidget'
import WidgetContainer from './components/WidgetContainer'

function App() {
  return (
    <div className="dashboard">
      <WidgetContainer id="battery" title="Battery" initialSize="small">
        <BatteryWidget />
      </WidgetContainer>

      <WidgetContainer id="temperature" title="Temperature" initialSize="small">
        <TemperatureWidget />
      </WidgetContainer>

      <WidgetContainer id="humidity" title="Humidity" initialSize="small">
        <HumidityWidget />
      </WidgetContainer>

      <WidgetContainer id="cell-signal" title="Cell Signal" initialSize="small">
        <CellSignalWidget />
      </WidgetContainer>
      
      <WidgetContainer id="garbage" title="Garbage Level" initialSize="medium">
        <GarbageWidget />
      </WidgetContainer>

      <WidgetContainer id="speed" title="Speed" initialSize="medium">
        <SpeedWidget />
      </WidgetContainer>

      <WidgetContainer id="heart-rate" title="Heart Rate" initialSize="small">
        <HeartRateWidget />
      </WidgetContainer>

      <WidgetContainer id="oxygen" title="Oxygen Level" initialSize="small">
        <OxygenLevelWidget />
      </WidgetContainer>

      <WidgetContainer id="heat-map" title="Body Heat Map" initialSize="large">
        <HeatMapWidget />
      </WidgetContainer>
    </div>
  )
}

export default App
