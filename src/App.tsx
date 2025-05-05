import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/shared/Navbar/NavBar'
import GameLocalPage from './components/pages/GameLocalPage/GameLocalPage';
import GameAIPage from './components/pages/GameAIPage/GameAIPage';
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