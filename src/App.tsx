import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import GameLocalPage from './components/GameLocalPage';
import GameAIPage from './components/GameAIPage';
import DocumentTitle from 'react-document-title';

function App() {
  return (
    <Router>
      <DocumentTitle title='Tic Tac Toe'></DocumentTitle>
      <NavBar />
      <Routes>
        <Route path="/" element={<GameLocalPage />} />
        <Route path="/ai" element={<GameAIPage />} />
      </Routes>
    </Router>
  );
}

export default App;