import React from 'react';
import { Game } from '../types';
import { X, Maximize2, RotateCcw } from 'lucide-react';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

export const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;
    
    if (!isFullscreen) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const reloadGame = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div id="game-player-overlay" className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      <div className="flex items-center justify-between p-4 border-bottom border-white/10 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            id="close-game-btn"
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <div>
            <h2 className="font-bold text-xl">{game.title}</h2>
            <p className="text-xs text-white/50 uppercase tracking-widest">{game.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            id="reload-game-btn"
            onClick={reloadGame}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 text-sm"
            title="Reload Game"
          >
            <RotateCcw size={18} />
            <span className="hidden sm:inline">Reload</span>
          </button>
          <button 
            id="fullscreen-game-btn"
            onClick={toggleFullscreen}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 text-sm"
            title="Fullscreen"
          >
            <Maximize2 size={18} />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      </div>
      
      <div className="flex-grow relative bg-neutral-900">
        <iframe
          id="game-iframe"
          ref={iframeRef}
          src={game.iframeUrl}
          className="w-full h-full border-none"
          allow="autoplay; fullscreen; keyboard"
          title={game.title}
        />
      </div>
    </div>
  );
};
