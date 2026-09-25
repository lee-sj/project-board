import { HashRouter, Route, Routes } from 'react-router-dom'
import { DatabaseView } from './components/DatabaseView'
import { ProjectPage } from './components/ProjectPage'

// HashRouter: GitHub Pages에서 새로고침/직접 접근 시 404 없이 동작
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DatabaseView />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<DatabaseView />} />
      </Routes>
    </HashRouter>
  )
}
