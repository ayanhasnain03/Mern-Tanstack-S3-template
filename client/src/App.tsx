import {lazy, Suspense} from "react"
import {  Routes, Route } from "react-router";
const Home = lazy(() => import("@/components/pages/Home"));

const App = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Suspense>
  )
}

export default App
