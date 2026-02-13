import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CheckInScreen } from './screens/CheckInScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckInScreen />} />
      </Routes>
    </Router>
  );
}
export default App;