import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import InterviewRoom from './components/InterviewRoom';
import Report from './components/Report';
import { View, InterviewerPersona } from './types';
import { INTERVIEWER_PERSONAS } from './constants';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedPersona, setSelectedPersona] = useState<InterviewerPersona>(INTERVIEWER_PERSONAS[0]);
  const [skipTraining, setSkipTraining] = useState(false);

  const handleStartInterview = () => {
    setSkipTraining(false);
    setCurrentView('interview');
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <Landing 
            onStart={handleStartInterview} 
            selectedPersona={selectedPersona}
            onPersonaSelect={setSelectedPersona}
          />
        );
      case 'interview':
        return (
          <InterviewRoom 
            onEnd={() => setCurrentView('report')} 
            persona={selectedPersona}
            onBackToHome={() => setCurrentView('landing')}
            skipTraining={skipTraining}
          />
        );
      case 'report':
        return (
          <Report 
            onBackToHome={() => setCurrentView('landing')} 
            onBackToInterview={() => {
              setSkipTraining(true);
              setCurrentView('interview');
            }}
          />
        );
      default:
        return (
          <Landing 
            onStart={() => setCurrentView('interview')} 
            selectedPersona={selectedPersona}
            onPersonaSelect={setSelectedPersona}
          />
        );
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {currentView === 'landing' && <Navbar onStartInterview={() => setCurrentView('interview')} />}
      {renderView()}
    </div>
  );
}
