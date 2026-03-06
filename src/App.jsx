import React, { useState, useMemo } from 'react';
import { Download, Share2, TrendingUp, Users, Zap, AlertCircle, CheckCircle2, BarChart3, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PERSONAS = [
  { id: 1, name: "Maya Patel", age: 32, trimester: "Third", stress: "High" },
  { id: 2, name: "Jessica Torres", age: 27, trimester: "First", stress: "Medium" },
  { id: 3, name: "Sophie Chen", age: 35, trimester: "Second", stress: "Medium" },
  { id: 4, name: "Aisha Johnson", age: 29, trimester: "Third", stress: "High" },
  { id: 5, name: "Emma Watson", age: 31, trimester: "First", stress: "High" },
  { id: 6, name: "Leah Rodriguez", age: 24, trimester: "Second", stress: "Medium" },
  { id: 7, name: "Patricia Hammond", age: 38, trimester: "Third", stress: "Medium" },
  { id: 8, name: "Raminder Kaur", age: 26, trimester: "First", stress: "High" },
  { id: 9, name: "Claire Mitchell", age: 30, trimester: "Second", stress: "Very High" },
  { id: 10, name: "Vanessa Williams", age: 33, trimester: "Third", stress: "Medium" }
];

export default function App() {
  const [trimesterFilter, setTrimesterFilter] = useState('All');

  const chartData = [
    { name: 'High Adopters', value: 4 },
    { name: 'Medium Adopters', value: 4 },
    { name: 'Low Adopters', value: 2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-5xl font-bold text-white mb-3">Research Analytics Dashboard</h1>
        <p className="text-lg text-slate-300 mb-8">Pregnancy Meditation App - User Research</p>

        <div className="mb-12">
          <label className="text-slate-300 text-sm font-semibold mr-3">Filter by Trimester:</label>
          <select
            value={trimesterFilter}
            onChange={(e) => setTrimesterFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2"
          >
            <option value="All">All Trimesters</option>
            <option value="First">First Trimester</option>
            <option value="Second">Second Trimester</option>
            <option value="Third">Third Trimester</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <p className="text-slate-400 text-sm uppercase mb-2">Total Personas</p>
            <p className="text-4xl font-bold text-white">10</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <p className="text-slate-400 text-sm uppercase mb-2">Avg Adoption Score</p>
            <p className="text-4xl font-bold text-white">6.1/10</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <p className="text-slate-400 text-sm uppercase mb-2">Stress Sources</p>
            <p className="text-4xl font-bold text-white">9</p>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Personas Overview</h2>
          <div className="space-y-3">
            {PERSONAS.map(p => (
              <div key={p.id} className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                <span className="text-white font-medium">{p.name}</span>
                <span className="text-slate-300 text-sm">{p.age}y • {p.trimester} • {p.stress} Stress</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-400">Dashboard is live! 🚀</p>
        </div>
      </div>
    </div>
  );
}
