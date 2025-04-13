# Dashboard Widgets

An Apple-style dashboard with interactive widgets for displaying various metrics and information.

![Dashboard Preview](dashboard-preview.png)

## Features

- **Battery Level Widget**: Displays battery status with charging indicator
- **Temperature Widget**: Shows temperature with thermometer visualization
- **Humidity Widget**: Displays humidity level with water drop indicator
- **Garbage Level Widget**: Visualizes trash level with a trash can graphic
- **Speed Widget**: Speedometer display for velocity indication
- **Heart Rate Widget**: Shows BPM with animated heart
- **Oxygen Level Widget**: SpO₂ measurement with O₂ molecule visualization
- **Body Heat Map Widget**: Interactive human body with temperature zones

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3 with custom properties
- SVG animations

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/dashboard-widgets.git
   cd dashboard-widgets
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Customization

All widgets use simulated data but can be easily modified to accept real data sources:

- Modify the data fetching in each widget's useEffect hook
- Adjust the min/max values for accurate representation
- Change the update intervals to match your data freshness requirements

## Deployment

This project is ready to be deployed on Vercel:

```bash
npm run build
# or
yarn build
```

## License

MIT

## Acknowledgements

- Inspired by Apple's design aesthetics
- SVG path generation tools
