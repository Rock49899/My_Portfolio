import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Hero from './components/hero';
import About from './components/about';
import Projects from './components/projects';
import Contact from './components/contact';
import Footer from './components/footer';
import ProjectTrust from './pages/ProjectTrust';
import ProjectLtaf from './pages/ProjectLtaf';
import ProjectMovieReview from './pages/ProjectMovieReview';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Projects />
            <Contact />
          </>
        } />
        <Route path="/project/trust" element={<ProjectTrust />} />
        <Route path="/project/ltaf" element={<ProjectLtaf />} />
        <Route path="/project/tomato-reviews" element={<ProjectMovieReview />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
