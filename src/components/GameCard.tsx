import React from 'react';
import { Game } from '../types';
import { Play } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div 
      id={`game-card-${game.id}`}
      className="glass-panel game-card-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col group"
      onClick={() => onSelect(game)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white text-black p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border border-white/10">
            {game.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-400 transition-colors">{game.title}</h3>
        <p className="text-white/50 text-sm line-clamp-2">{game.description}</p>
      </div>
    </div>
  );
};
