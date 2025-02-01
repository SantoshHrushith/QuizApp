import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import DetailedSolution from './pages/DetailedSolution';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path='results' element={<Results />} />
        <Route path="/detailed-solution" element={<DetailedSolution />} />
      </Routes>
    </Router>
  );
}

export default App;
