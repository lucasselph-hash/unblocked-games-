import React, { useState, useMemo } from 'react';
import { Game } from './types';
import gamesData from './data/games.json';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { Search, Gamepad2, Github, Twitter, Info, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(gamesData.map(g => g.category))];
    return cats;
  }, []);

  const filteredGames = useMemo(() => {
    return (gamesData as Game[]).filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
              <Gamepad2 className="text-black" size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              NEXUS<span className="text-emerald-500">GAMES</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Popular</a>
            <a href="#" className="hover:text-white transition-colors">New</a>
            <a href="#" className="hover:text-white transition-colors">Categories</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-64 transition-all"
              />
            </div>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Info size={20} className="text-white/60" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600/20 to-blue-600/20 border border-white/10 p-8 md:p-12">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4 border border-emerald-500/20">
                Featured Game
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">The Best Unblocked Games, Anywhere.</h2>
              <p className="text-lg text-white/60 mb-8">Access a curated collection of high-quality web games directly in your browser. No downloads, no blocks, just pure fun.</p>
              <button 
                onClick={() => setSelectedGame(gamesData[0] as Game)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Play size={20} fill="currentColor" />
                Play Now
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10" />
              <img 
                src="https://picsum.photos/seed/gaming/800/600" 
                alt="Gaming" 
                className="w-full h-full object-cover opacity-40"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="sm:hidden relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input 
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full"
            />
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <GameCard game={game as Game} onSelect={setSelectedGame} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-white/20" />
            </div>
            <h3 className="text-xl font-bold mb-2">No games found</h3>
            <p className="text-white/40">Try adjusting your search or category filter.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0c] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-500 p-2 rounded-xl">
                  <Gamepad2 className="text-black" size={20} />
                </div>
                <h1 className="text-xl font-bold tracking-tight">
                  NEXUS<span className="text-emerald-500">GAMES</span>
                </h1>
              </div>
              <p className="text-white/40 max-w-sm mb-6">
                The ultimate destination for unblocked web games. High performance, curated selection, and zero interruptions.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <Github size={20} className="text-white/60" />
                </a>
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <Twitter size={20} className="text-white/60" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-white/40">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Browse All</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Popular Games</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">New Releases</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-white/40">Categories</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Action</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Puzzle</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Arcade</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Classic</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
            <p>© 2026 Nexus Games. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Game Player Overlay */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <GamePlayer 
              game={selectedGame} 
              onClose={() => setSelectedGame(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
