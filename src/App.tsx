import './styles/Dashboard.css'
import BatteryWidget from './components/BatteryWidget'
import TemperatureWidget from './components/TemperatureWidget'
import HumidityWidget from './components/HumidityWidget'
import GarbageWidget from './components/GarbageWidget'
import SpeedWidget from './components/SpeedWidget'
import HeartRateWidget from './components/HeartRateWidget'
import OxygenLevelWidget from './components/OxygenLevelWidget'
import HeatMapWidget from './components/HeatMapWidget'

function App() {
  return (
    <div className="dashboard">
      <BatteryWidget />
      <TemperatureWidget />
      <HumidityWidget />
      <GarbageWidget />
      <SpeedWidget />
      <HeartRateWidget />
      <OxygenLevelWidget />
      <HeatMapWidget />
    </div>
  )
}

export default App
