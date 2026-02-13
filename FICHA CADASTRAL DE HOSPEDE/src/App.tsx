import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CheckInScreen } from './screens/CheckInScreen';
import { useSystemArmor } from './hooks/useSystemArmor';

function App() {
  useSystemArmor(); // ATIVANDO BLINDAGEM NIVEL 9

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckInScreen />} />
      </Routes>
    </Router>
  );
}
export default App;