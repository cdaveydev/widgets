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
      <WidgetContainer initialSize="small" id="battery">
        <BatteryWidget />
      </WidgetContainer>

      <WidgetContainer initialSize="small" id="temperature">
        <TemperatureWidget />
      </WidgetContainer>

      <WidgetContainer initialSize="small" id="humidity">
        <HumidityWidget />
      </WidgetContainer>

      <WidgetContainer initialSize="small" id="cell-signal">
        <CellSignalWidget />
      </WidgetContainer>
      
      <WidgetContainer initialSize="medium" id="garbage">
        <GarbageWidget />
      </WidgetContainer>

      <WidgetContainer initialSize="medium" id="speed">
        <SpeedWidget />
      </WidgetContainer>

      <WidgetContainer initialSize="small" id="heart-rate">
        <HeartRateWidget />
      </WidgetContainer>

      <WidgetContainer initialSize="small" id="oxygen">
        <OxygenLevelWidget />
      </WidgetContainer>

      <WidgetContainer initialSize="large" id="heat-map">
        <HeatMapWidget />
      </WidgetContainer>
    </div>
  )
}

export default App
