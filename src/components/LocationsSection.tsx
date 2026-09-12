import React, { useState } from 'react';
import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  city: string;
  phone: string;
  hours: string[];
  lat: number;
  lng: number;
}

const LOCATIONS: Location[] = [
  {
    id: 'downtown',
    name: 'SHAM & SMOKE — DOWNTOWN FLAGSHIP',
    neighborhood: 'Financial & Arts District',
    address: '412 Grand Avenue, Suite 100',
    city: 'Metropolis, NY 10013',
    phone: '+1 (555) 839-2041',
    hours: [
      'MON – THU: 11:30 AM – 10:00 PM',
      'FRI – SAT: 11:30 AM – 11:30 PM',
      'SUN: 12:00 PM – 9:30 PM',
    ],
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 'pearl',
    name: 'SHAM & SMOKE — PEARL HEARTH',
    neighborhood: 'West End Culinary Strip',
    address: '890 Olive Street',
    city: 'Metropolis, NY 10002',
    phone: '+1 (555) 720-9182',
    hours: [
      'MON – SUN: 12:00 PM – 11:00 PM',
    ],
    lat: 40.72,
    lng: -73.995,
  },
];

export const LocationsSection: React.FC = () => {
  const [activeLoc, setActiveLoc] = useState<Location>(LOCATIONS[0]);

  return (
    <section id="locations" className="relative py-28 bg-[#0E0E11] border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9B2226]" />
              VISIT OUR HEARTHS
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl uppercase tracking-tighter text-white">
              LOCATIONS & <span className="text-gradient-gold">HOURS</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-light max-w-sm">
            Dine in our dark editorial dining rooms or order express pickup fresh from our charcoal spits.
          </p>
        </div>

        {/* Location Selector Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Location Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                onClick={() => setActiveLoc(loc)}
                className={`p-6 border transition-all duration-300 text-left cursor-pointer ${
                  activeLoc.id === loc.id
                    ? 'bg-[#18181D] border-[#9B2226] shadow-xl'
                    : 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">{loc.neighborhood}</span>
                  {activeLoc.id === loc.id && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9B2226] animate-ping" />
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2">{loc.name}</h3>
                
                <p className="text-xs text-zinc-400 font-light mb-4">
                  {loc.address}, {loc.city}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#9B2226]" />
                    {loc.phone}
                  </span>
                </div>
              </div>
            ))}

            {/* Hours Box */}
            <div className="p-6 bg-[#141418] border border-zinc-800 text-left space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9B2226]" />
                OPERATING HOURS ({activeLoc.neighborhood})
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                {activeLoc.hours.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Dark Styled Interactive Map Box */}
          <div className="lg:col-span-7 relative min-h-[380px] bg-[#121215] border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between p-8 text-left">
            {/* Map Canvas Styling Mockup */}
            <div className="absolute inset-0 bg-[#16161B] opacity-90">
              {/* Decorative Map Grid Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#26262D_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-zinc-800/80" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800/80" />
            </div>

            {/* Map Pin Indicator */}
            <div className="relative z-10 self-center my-auto flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#9B2226] text-white flex items-center justify-center shadow-[0_0_30px_rgba(155,34,38,0.8)] border-2 border-white/20 animate-bounce">
                <MapPin className="w-6 h-6 fill-current" />
              </div>
              <div className="px-4 py-2 bg-black/90 backdrop-blur-md border border-zinc-700 rounded-lg text-center shadow-xl">
                <span className="font-display font-bold text-xs text-white uppercase block">{activeLoc.name}</span>
                <span className="text-[10px] text-zinc-400 font-mono">{activeLoc.address}</span>
              </div>
            </div>

            {/* Bottom Actions overlay */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
              <div className="text-xs font-mono text-zinc-400">
                <span>COORDINATES: {activeLoc.lat.toFixed(4)}° N, {Math.abs(activeLoc.lng).toFixed(4)}° W</span>
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeLoc.address + ' ' + activeLoc.city)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9B2226] hover:bg-[#B71C1C] text-white text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300"
              >
                <span>GET DIRECTIONS</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
