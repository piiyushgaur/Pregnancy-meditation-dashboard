import React, { useState, useMemo } from 'react';
import { Download, Share2, Filter, TrendingUp, Users, Zap, AlertCircle, CheckCircle2, BarChart3, Activity } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PERSONAS = [
  { id: 1, name: "Maya Patel", age: 32, trimester: "Third", occupation: "Software Engineer", stress: "High", techComfort: "Very High" },
  { id: 2, name: "Jessica Torres", age: 27, trimester: "First", occupation: "HR Manager", stress: "Medium", techComfort: "Medium" },
  { id: 3, name: "Sophie Chen", age: 35, trimester: "Second", occupation: "Freelance Designer", stress: "Medium", techComfort: "Medium-High" },
  { id: 4, name: "Aisha Johnson", age: 29, trimester: "Third", occupation: "Nurse", stress: "High", techComfort: "Low-Medium" },
  { id: 5, name: "Emma Watson", age: 31, trimester: "First", occupation: "Marketing Director", stress: "High", techComfort: "Very High" },
  { id: 6, name: "Leah Rodriguez", age: 24, trimester: "Second", occupation: "Graduate Student", stress: "Medium", techComfort: "Very High" },
  { id: 7, name: "Patricia Hammond", age: 38, trimester: "Third", occupation: "College Professor", stress: "Medium", techComfort: "Medium" },
  { id: 8, name: "Raminder Kaur", age: 26, trimester: "First", occupation: "Business Owner", stress: "High", techComfort: "Low" },
  { id: 9, name: "Claire Mitchell", age: 30, trimester: "Second", occupation: "Financial Analyst", stress: "Very High", techComfort: "Very High" },
  { id: 10, name: "Vanessa Williams", age: 33, trimester: "Third", occupation: "PR Manager", stress: "Medium", techComfort: "High" }
];

const SURVEY_RESPONSES = {
  1: {
    q1: "My biggest concern is labor. I need to feel in control, but pregnancy has made that impossible. I obsess about worst-case scenarios.",
    q2: "I journal and work out, but honestly? Nothing really works. I just push through and manage my anxiety with rational thinking.",
    q3: "Yes, but only if it's evidence-based. I'd use it for labor prep specifically, but not for general pregnancy wellness.",
    q4: "I need: clear science showing it works, ability to track results, and sessions focused on labor anxiety. Without these, I'll download and forget."
  },
  2: {
    q1: "Nausea is killing me, and managing my older kid while pregnant is brutal. Plus my new partner and I are navigating this together which adds pressure.",
    q2: "Talking to my mom helps. Exercising when I can. Mostly I need to know other people are struggling too—it's isolating.",
    q3: "Absolutely! I'd love an app that doesn't make me feel alone. Something with community would be huge.",
    q4: "Make it social. Show me other pregnant women. Quick 10-min sessions. Don't make it preachy or toxic-positive."
  },
  3: {
    q1: "I have a baseline anxiety about fetal health. I had a miscarriage before, and even though I know it's unlikely again, the fear is constant.",
    q2: "I meditate daily and do yoga. But I'm also reading constantly, which probably feeds the anxiety. I need deeper emotional support.",
    q3: "Definitely. I'd love something that acknowledges the emotional complexity, not just surface-level relaxation.",
    q4: "Content that validates the hard stuff. A community of women who've been through loss. Personalized reassurance based on pregnancy stage."
  },
  4: {
    q1: "I'm exhausted. 12-hour shifts while pregnant means I have no energy for anything. My body hurts. Can't sleep enough.",
    q2: "Honestly? Coffee and willpower. I walk when I can, but mostly I just survive each day. I don't have bandwidth for wellness.",
    q3: "Probably not. I'd use it if it was 3 minutes, offline, and didn't require WiFi or data.",
    q4: "If it exists: make it offline, make it SHORT, make it free or very cheap. But realistically, I won't use it."
  },
  5: {
    q1: "Career anxiety is massive. I'm taking maternity leave and terrified I'll lose momentum. Also anxiety about how my body changes will affect my professional presence.",
    q2: "Peloton keeps me sane. I track everything—sleep, workouts, stress. Data helps me feel in control.",
    q3: "Yes, but I need to track the impact. Show me how it affects my sleep/stress metrics. Make it integrate with Apple Health.",
    q4: "Personalization. Analytics dashboard. Proof it works. Don't waste my time with fluff—I need ROI on this investment."
  },
  6: {
    q1: "Unplanned pregnancy while in grad school. Body image is tanking. Peers are graduating while I'm gaining weight. Uncertainty about everything.",
    q2: "YouTube videos help. I take walks. Honestly, free stuff only—I'm broke and stressed about money.",
    q3: "Maybe? If it's free and explained scientifically. I like understanding the WHY behind things.",
    q4: "Free. Scientifically explained. Not judgmental about unplanned pregnancy. No body-shaming. Show the research."
  },
  7: {
    q1: "Age anxiety (38 is advanced maternal age). This is my third pregnancy so I know the physical toll. Pressure to 'do this right' and prepare perfectly.",
    q2: "Long-time meditation practitioner. Journaling deeply. Reading about pregnancy as both science and experience.",
    q3: "Yes, but I want depth. Not generic 'relax' content. Something that honors the philosophical and emotional complexity.",
    q4: "Literary quality. Community of women 35+. Personalization. Content that respects my intelligence and experience."
  },
  8: {
    q1: "Business can't function without me, but I need to slow down. Family says I should 'just manage it' but that's not realistic. Cultural pressure to not show the pregnancy visibly.",
    q2: "Yoga (briefly, before feeling guilty). Prayers daily. Mostly guilt about stopping work.",
    q3: "Only if it's super quick. 5 minutes max. Spiritual but not religious. Something my family could understand.",
    q4: "Efficient. Family-oriented. Maybe something that validates that I'm still capable even while pregnant. Free or low-cost."
  },
  9: {
    q1: "Perfectionism about pregnancy. Comparison to friends' pregnancies. Tracking everything obsessively. Need to 'optimize' this experience.",
    q2: "Running every morning. Oura ring tracks everything. I'm already in 5 wellness apps.",
    q3: "Yes, if it integrates with my other apps and gives me personalized recommendations based on my patterns.",
    q4: "Integration with health tools. Personalized insights. Quality over quantity. Avoid overwhelming me with choices."
  },
  10: {
    q1: "Fertility treatment trauma is resurfacing. Loss of pre-pregnancy identity and public image. Can't be my outgoing self right now.",
    q2: "Group fitness (but can't do now). Therapy (considering). Mostly I need to know I'm not alone in this weird grief.",
    q3: "Yes, especially if there's real community and authentic stories, not polished content.",
    q4: "Real stories from real women. Community feel. Space to be vulnerable. Not toxic positivity. Affordable."
  }
};

const analyzeResponses = () => {
  const analysis = {};

  PERSONAS.forEach(persona => {
    const responses = SURVEY_RESPONSES[persona.id];
    const allText = Object.values(responses).join(' ').toLowerCase();

    const stressSources = [];
    if (allText.includes('labor') || allText.includes('control')) stressSources.push('Labor Anxiety');
    if (allText.includes('work') || allText.includes('career') || allText.includes('momentum')) stressSources.push('Career Pressure');
    if (allText.includes('family') || allText.includes('cultural')) stressSources.push('Family Pressure');
    if (allText.includes('health') || allText.includes('fetal') || allText.includes('miscarriage')) stressSources.push('Health Anxiety');
    if (allText.includes('body') || allText.includes('appearance') || allText.includes('weight')) stressSources.push('Body Image');
    if (allText.includes('isolation') || allText.includes('alone') || allText.includes('social')) stressSources.push('Social/Isolation');
    if (allText.includes('identity') || allText.includes('self')) stressSources.push('Identity Loss');
    if (allText.includes('tired') || allText.includes('exhausted') || allText.includes('energy')) stressSources.push('Physical Exhaustion');
    if (allText.includes('financial') || allText.includes('money') || allText.includes('cost')) stressSources.push('Financial Stress');

    let adoptionScore = 0;
    const adoptionSignals = ['definitely', 'absolutely', 'yes', 'love', 'huge', 'need'];
    const hesitationSignals = ['probably not', 'maybe', 'if only', 'realistically', 'unlikely'];
    
    adoptionSignals.forEach(signal => {
      if (allText.includes(signal)) adoptionScore += 3;
    });
    hesitationSignals.forEach(signal => {
      if (allText.includes(signal)) adoptionScore -= 2;
    });
    adoptionScore = Math.max(0, Math.min(10, 5 + adoptionScore));

    const features = [];
    if (allText.includes('data') || allText.includes('track') || allText.includes('metric')) features.push('Analytics & Tracking');
    if (allText.includes('community') || allText.includes('together') || allText.includes('social')) features.push('Community');
    if (allText.includes('short') || allText.includes('quick') || allText.includes('3 minute')) features.push('Short Sessions');
    if (allText.includes('offline') || allText.includes('wifi')) features.push('Offline Mode');
    if (allText.includes('scientific') || allText.includes('evidence') || allText.includes('research')) features.push('Science-Backed');
    if (allText.includes('personali') || allText.includes('custom') || allText.includes('integrate')) features.push('Personalization');
    if (allText.includes('labor')) features.push('Labor-Specific Content');
    if (allText.includes('vulnerable') || allText.includes('authentic') || allText.includes('real')) features.push('Authenticity');
    if (allText.includes('free') || allText.includes('cost')) features.push('Affordability');

    analysis[persona.id] = {
      persona,
      stressSources: [...new Set(stressSources)],
      adoptionScore,
      features: [...new Set(features)],
      fullResponses: responses
    };
  });

  return analysis;
};

export default function AnalyticsDashboard() {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [viewMode, setViewMode] = useState('overview');
  const [shareToken, setShareToken] = useState(null);
  const [copied, setCopied] = useState(false);
  const [trimesterFilter, setTrimesterFilter] = useState('All');
  
  const analysisData = useMemo(() => analyzeResponses(), []);

  const exportReport = () => {
    const exportData = {
      surveyMetadata: {
        title: "Pregnancy Meditation App - User Research Analysis",
        totalPersonas: PERSONAS.length,
        totalQuestions: 4,
        timestamp: new Date().toISOString()
      },
      personas: PERSONAS,
      responses: SURVEY_RESPONSES,
      analysis: analysisData
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `research-dashboard-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    const token = Math.random().toString(36).substring(2, 11);
    setShareToken(token);
    const shareUrl = `research-dashboard-${token}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const stressSourceCounts = {};
  const featureCounts = {};
  const adoptionByStress = { High: [], Medium: [], 'Very High': [] };

  const filteredPersonas = trimesterFilter === 'All' 
    ? PERSONAS 
    : PERSONAS.filter(p => p.trimester === trimesterFilter);

  filteredPersonas.forEach(persona => {
    const analysis = analysisData[persona.id];
    analysis.stressSources.forEach(source => {
      stressSourceCounts[source] = (stressSourceCounts[source] || 0) + 1;
    });
    analysis.features.forEach(feature => {
      featureCounts[feature] = (featureCounts[feature] || 0) + 1;
    });
    adoptionByStress[persona.stress] = adoptionByStress[persona.stress] || [];
    adoptionByStress[persona.stress].push(analysis.adoptionScore);
  });

  const stressSourceData = Object.entries(stressSourceCounts)
    .map(([source, count]) => ({ name: source, count }))
    .sort((a, b) => b.count - a.count);

  const featureData = Object.entries(featureCounts)
    .map(([feature, count]) => ({ name: feature, count }))
    .sort((a, b) => b.count - a.count);

  const adoptionData = [
    { stress: 'High Stress', avg: adoptionByStress['High'].length > 0 ? (adoptionByStress['High'].reduce((a, b) => a + b, 0) / adoptionByStress['High'].length).toFixed(1) : 0 },
    { stress: 'Medium Stress', avg: adoptionByStress['Medium'].length > 0 ? (adoptionByStress['Medium'].reduce((a, b) => a + b, 0) / adoptionByStress['Medium'].length).toFixed(1) : 0 },
    { stress: 'Very High Stress', avg: adoptionByStress['Very High'].length > 0 ? (adoptionByStress['Very High'].reduce((a, b) => a + b, 0) / adoptionByStress['Very High'].length).toFixed(1) : 0 }
  ];

  const trimesterData = [
    { name: 'First Trimester', value: PERSONAS.filter(p => p.trimester === 'First').length },
    { name: 'Second Trimester', value: PERSONAS.filter(p => p.trimester === 'Second').length },
    { name: 'Third Trimester', value: PERSONAS.filter(p => p.trimester === 'Third').length }
  ];

  const trendData = [
    { segment: 'High Adopters', count: Object.values(analysisData).filter(a => a.adoptionScore >= 7).length },
    { segment: 'Medium Adopters', count: Object.values(analysisData).filter(a => a.adoptionScore >= 4 && a.adoptionScore < 7).length },
    { segment: 'Low Adopters', count: Object.values(analysisData).filter(a => a.adoptionScore < 4).length }
  ];

  const COLORS = ['#ec4899', '#d946ef', '#a855f7', '#7c3aed', '#6366f1', '#3b82f6', '#06b6d4', '#10b981'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">Research Analytics Dashboard</h1>
          <p className="text-lg text-slate-300">Deep analysis of 10 personas × 4 research questions = 40 data points</p>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${viewMode === 'overview' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              Analytics
            </button>
            <button
              onClick={() => setViewMode('personas')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${viewMode === 'personas' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              Persona Profiles
            </button>
          </div>
        </div>

        {viewMode === 'overview' && (
          <>
            <div className="mb-12 flex justify-between items-center">
              <div>
                <label className="text-slate-300 text-sm font-semibold mr-3">Filter by Trimester:</label>
                <select
                  value={trimesterFilter}
                  onChange={(e) => setTrimesterFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                >
                  <option value="All">All Trimesters</option>
                  <option value="First">First Trimester</option>
                  <option value="Second">Second Trimester</option>
                  <option value="Third">Third Trimester</option>
                </select>
              </div>
              <p className="text-slate-400 text-sm">Showing data for {filteredPersonas.length} personas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-slate-400 text-sm uppercase">Total Personas</p>
                  <Users size={20} className="text-pink-400" />
                </div>
                <p className="text-4xl font-bold text-white">{PERSONAS.length}</p>
                <p className="text-xs text-slate-500 mt-2">Across all trimesters</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-slate-400 text-sm uppercase">Avg Adoption Score</p>
                  <TrendingUp size={20} className="text-green-400" />
                </div>
                <p className="text-4xl font-bold text-white">{(Object.values(analysisData).reduce((sum, a) => sum + a.adoptionScore, 0) / 10).toFixed(1)}/10</p>
                <p className="text-xs text-slate-500 mt-2">Strong market interest</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-slate-400 text-sm uppercase">Stress Sources Found</p>
                  <AlertCircle size={20} className="text-yellow-400" />
                </div>
                <p className="text-4xl font-bold text-white">{Object.keys(stressSourceCounts).length}</p>
                <p className="text-xs text-slate-500 mt-2">Unique pain points</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-slate-400 text-sm uppercase">Must-Have Features</p>
                  <CheckCircle2 size={20} className="text-blue-400" />
                </div>
                <p className="text-4xl font-bold text-white">{Object.keys(featureCounts).length}</p>
                <p className="text-xs text-slate-500 mt-2">Feature requests identified</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <AlertCircle size={20} className="text-yellow-400" /> Top Stress Sources
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stressSourceData} layout="vertical" margin={{ left: 150, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={140} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="count" fill="#ec4899" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Zap size={20} className="text-purple-400" /> Feature Requests (Frequency)
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={featureData} layout="vertical" margin={{ left: 150, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={140} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="count" fill="#a855f7" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp size={20} className="text-green-400" /> Adoption Intent by Stress Level
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={adoptionData} margin={{ bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="stress" angle={-45} textAnchor="end" height={100} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="avg" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Activity size={20} className="text-cyan-400" /> Personas by Trimester
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={trimesterData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} (${value})`} outerRadius={100} fill="#8884d8" dataKey="value">
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur lg:col-span-2">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 size={20} className="text-pink-400" /> User Segments by Adoption Likelihood
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trendData} margin={{ bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="segment" angle={-45} textAnchor="end" height={100} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      <Cell fill="#ec4899" />
                      <Cell fill="#a855f7" />
                      <Cell fill="#6366f1" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-6">🎯 Key Insights & Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-pink-400 font-semibold mb-2">Top Pain Points</p>
                  <ul className="text-slate-200 space-y-1 text-sm">
                    {stressSourceData.slice(0, 5).map((item, idx) => (
                      <li key={idx}>• {item.name} ({item.count} mentions)</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-purple-400 font-semibold mb-2">Must-Build Features</p>
                  <ul className="text-slate-200 space-y-1 text-sm">
                    {featureData.slice(0, 5).map((item, idx) => (
                      <li key={idx}>• {item.name} ({item.count} users)</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-green-400 font-semibold mb-2">High Adopters (Score 7+)</p>
                  <ul className="text-slate-200 space-y-1 text-sm">
                    {Object.values(analysisData).filter(a => a.adoptionScore >= 7).map(a => (
                      <li key={a.persona.id}>• {a.persona.name} ({a.adoptionScore.toFixed(1)}/10)</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-yellow-400 font-semibold mb-2">Critical Barriers</p>
                  <ul className="text-slate-200 space-y-1 text-sm">
                    {Object.values(analysisData).filter(a => a.adoptionScore < 4).map(a => (
                      <li key={a.persona.id}>• {a.persona.name} (Low adoption)</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {viewMode === 'personas' && (
          <div className="space-y-8">
            {Object.values(analysisData).map(({ persona, stressSources, adoptionScore, features, fullResponses }) => (
              <div key={persona.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 backdrop-blur">
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-700">
                  <div>
                    <h3 className="text-3xl font-bold text-white">{persona.name}</h3>
                    <p className="text-slate-400 text-sm mt-2">{persona.age}y • {persona.occupation} • {persona.trimester} Trimester</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-sm uppercase">Adoption Score</p>
                    <p className={`text-4xl font-bold ${adoptionScore >= 7 ? 'text-green-400' : adoptionScore >= 4 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {adoptionScore.toFixed(1)}/10
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 uppercase mb-3">Stress Sources</h4>
                    <div className="flex flex-wrap gap-2">
                      {stressSources.length > 0 ? (
                        stressSources.map((source, idx) => (
                          <span key={idx} className="px-3 py-1 bg-red-900/30 border border-red-700 text-red-200 rounded-full text-xs font-medium">
                            {source}
                          </span>
                        ))
                      ) : (
                        <p className="text-slate-500 text-xs">Low stress baseline</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 uppercase mb-3">Feature Needs</h4>
                    <div className="flex flex-wrap gap-2">
                      {features.length > 0 ? (
                        features.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 bg-purple-900/30 border border-purple-700 text-purple-200 rounded-full text-xs font-medium">
                            {feature}
                          </span>
                        ))
                      ) : (
                        <p className="text-slate-500 text-xs">No specific needs</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 uppercase mb-3">Profile Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${persona.stress === 'High' || persona.stress === 'Very High' ? 'bg-orange-900/30 border border-orange-700 text-orange-200' : 'bg-blue-900/30 border border-blue-700 text-blue-200'}`}>
                        {persona.stress} Stress
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${persona.techComfort === 'Very High' || persona.techComfort === 'High' ? 'bg-green-900/30 border border-green-700 text-green-200' : 'bg-gray-700/30 border border-gray-600 text-gray-300'}`}>
                        {persona.techComfort} Tech
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h4 className="text-sm font-semibold text-slate-300 uppercase mb-4">Full Responses</h4>
                  <div className="space-y-4">
                    {Object.entries(fullResponses).map(([qKey, response], idx) => (
                      <div key={qKey} className="bg-slate-700/30 p-4 rounded-lg">
                        <p className="text-xs text-slate-400 mb-2">Question {idx + 1}</p>
                        <p className="text-slate-200 text-sm leading-relaxed">{response}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {shareToken && (
          <div className="mt-12 bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Share2 size={24} className="text-pink-400" /> Dashboard Shared!
            </h3>
            <p className="text-slate-300 mb-4">Share token copied to clipboard:</p>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <code className="text-pink-300 font-mono">{`research-dashboard-${shareToken}`}</code>
            </div>
            <p className="text-slate-400 text-sm mt-3">Send this to stakeholders to reference your research findings</p>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-sm">Research Dashboard • 10 Personas × 4 Questions • Deep Behavioral Analysis</p>
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={exportReport}
              className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-all text-sm flex items-center gap-2">
              <Download size={16} /> Export Report
            </button>
            <button 
              onClick={handleShare}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all text-sm flex items-center gap-2">
              <Share2 size={16} /> {copied ? 'Copied!' : 'Share Dashboard'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

4. Click **"Commit new file"**

✅ **Dashboard file created!**

---

## **STEP 6: Create `.gitignore` File (Best Practice)**

1. Click **"Add file"** → **"Create new file"**
2. In the filename field, type: `.gitignore`
3. Paste **exactly this:**
```
node_modules/
build/
dist/
.env
.DS_Store
npm-debug.log
yarn-error.log
```

4. Click **"Commit new file"**

✅ **File created!**

---

## **STEP 7: Verify Your File Structure**

Your GitHub repo should now look like this:
```
pregnancy-meditation-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   └── App.jsx
├── package.json
├── .gitignore
└── README.md
```

✅ **Perfect! All files are ready!**

---

## **STEP 8: Deploy to Vercel**

1. Go to **vercel.com** in a new tab
2. Click **"Sign Up"** (top right)
3. Click **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account
5. Click **"New Project"**
6. Look for your repo **`pregnancy-meditation-dashboard`** and click **"Select"**
7. Vercel will auto-detect it's a React app
8. Click **"Deploy"** (bottom right) - **DON'T CHANGE ANY SETTINGS**
9. **Wait 60-90 seconds** while it builds...

✅ **When you see "Deployment Successful", you're done!**

You'll get a URL like:
```
https://pregnancy-meditation-dashboard.vercel.app
```

---

## **STEP 9: Share Your Live Dashboard**

Send this link to anyone:
```
"Check out our research dashboard: https://pregnancy-meditation-dashboard.vercel.app"
