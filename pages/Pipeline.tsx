import React, { useState, useMemo } from 'react';
import { Plus, MoreHorizontal, DollarSign, Calendar, Tag, Trash2, Edit2 } from 'lucide-react';
import { Lead, LeadStatus, Priority } from '../types';

const INITIAL_LEADS: Lead[] = [
  { id: '1', name: 'Acme Corp', company: 'Acme Inc.', value: 15000, status: LeadStatus.NEW, priority: Priority.HIGH, createdAt: new Date(), email: 'contact@acme.com', tags: ['Enterprise'] },
  { id: '2', name: 'Stark Ind', company: 'Stark Industries', value: 50000, status: LeadStatus.NEGOTIATION, priority: Priority.HIGH, createdAt: new Date(), email: 'tony@stark.com', tags: ['VIP', 'Tech'] },
  { id: '3', name: 'Wayne Ent', company: 'Wayne Enterprises', value: 35000, status: LeadStatus.PROPOSAL, priority: Priority.MEDIUM, createdAt: new Date(), email: 'bruce@wayne.com', tags: ['Finance'] },
  { id: '4', name: 'Cyberdyne', company: 'Cyberdyne Systems', value: 12000, status: LeadStatus.CONTACTED, priority: Priority.LOW, createdAt: new Date(), email: 'sales@cyberdyne.com', tags: ['Gov'] },
];

export const Pipeline: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sort Controls
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'value'>('date');

  const columns = Object.values(LeadStatus);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLeadId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    if (!draggedLeadId) return;

    setLeads(prev => prev.map(l => 
      l.id === draggedLeadId ? { ...l, status } : l
    ));
    setDraggedLeadId(null);
  };

  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      if (sortBy === 'value') return b.value - a.value;
      if (sortBy === 'priority') {
        const pMap = { [Priority.HIGH]: 3, [Priority.MEDIUM]: 2, [Priority.LOW]: 1 };
        return pMap[b.priority] - pMap[a.priority];
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }, [leads, sortBy]);

  const addNewLead = () => {
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Prospect',
      company: 'Unknown Co.',
      value: 5000,
      status: LeadStatus.NEW,
      priority: Priority.MEDIUM,
      createdAt: new Date(),
      email: '',
      tags: ['New']
    };
    setLeads([...leads, newLead]);
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.HIGH: return 'bg-red-50 text-red-600 border-red-100';
      case Priority.MEDIUM: return 'bg-orange-50 text-orange-600 border-orange-100';
      case Priority.LOW: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Pipeline Toolbar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
           <span className="text-sm text-gray-500 font-medium">Sort by:</span>
           <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
           >
             <option value="date">Date Created</option>
             <option value="priority">Priority</option>
             <option value="value">Deal Value</option>
           </select>
        </div>
        <button 
          onClick={addNewLead}
          className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-gray-200"
        >
          <Plus size={16} />
          New Lead
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max h-full">
          {columns.map(status => (
            <div 
              key={status}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
              className="w-80 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4 px-1">
                 <h3 className="text-sm font-semibold text-gray-700">{status}</h3>
                 <span className="bg-gray-200/50 text-gray-500 px-2 py-0.5 rounded-full text-xs font-medium">
                   {leads.filter(l => l.status === status).length}
                 </span>
              </div>

              <div className="flex-1 bg-gray-100/50 rounded-xl p-2 border border-dashed border-gray-200">
                {sortedLeads.filter(l => l.status === status).map(lead => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    className="group bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all relative animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                       <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getPriorityColor(lead.priority)} uppercase tracking-wider font-semibold`}>
                         {lead.priority}
                       </span>
                       <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                         <button onClick={() => deleteLead(lead.id)} className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded">
                           <Trash2 size={12} />
                         </button>
                         <button className="p-1 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded">
                           <MoreHorizontal size={12} />
                         </button>
                       </div>
                    </div>
                    <h4 className="font-medium text-gray-900 leading-tight">{lead.company}</h4>
                    <p className="text-xs text-gray-500 mt-1">{lead.name}</p>
                    
                    <div className="mt-3 flex items-center gap-3">
                       <div className="flex items-center gap-1 text-gray-600 text-xs font-medium bg-gray-50 px-2 py-1 rounded border border-gray-100">
                         <DollarSign size={10} />
                         {lead.value.toLocaleString()}
                       </div>
                       {lead.tags.map(tag => (
                         <span key={tag} className="text-[10px] text-gray-400 border border-gray-100 px-1.5 py-0.5 rounded">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>
                ))}
                {leads.filter(l => l.status === status).length === 0 && (
                  <div className="h-24 flex items-center justify-center text-gray-300 text-xs italic">
                    Drop here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
