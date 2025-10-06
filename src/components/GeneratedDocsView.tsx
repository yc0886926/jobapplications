import React, { useState } from 'react';
import { Search, Eye, FileText, Users, Filter, Download, Clock, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

interface GeneratedItem {
  id: number;
  name: string;
  status: string;
  type: 'document' | 'process';
  userType: string;
  user: { name: string; avatar: string | null };
  startDate: string;
  completionDate: string | null;
  viewedAt?: string | null;
  expiresAt?: string | null;
  isExpired?: boolean;
  viewedAt?: string | null;
  expiresAt?: string | null;
  isExpired?: boolean;
}

export const GeneratedDocsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'documents' | 'processes'>('all');
  const [items, setItems] = useState<GeneratedItem[]>(() => {

  const generatedItems = [
    {
      id: 1,
      name: 'Offer Letter - Garcia, Maria (Candidate) - REQ-1001',
      status: 'Completed',
      type: 'document',
      userType: 'Candidate',
      user: { name: 'Andrea Cruz', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2' },
      startDate: '08/20/24 3:05 PM',
      completionDate: '08/20/24 3:05 PM',
      viewedAt: null,
      expiresAt: null,
      isExpired: false
    },
    {
      id: 2,
      name: 'Interview Invite - Chen, David (Candidate) - REQ-1003',
      status: 'In Progress',
      type: 'document',
      userType: 'Candidate',
      user: { name: 'Alexa Dee', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2' },
      startDate: '08/20/24 3:05 PM',
      completionDate: null,
      viewedAt: null,
      expiresAt: null,
      isExpired: false
    },
    {
      id: 3,
      name: 'Employee Handbook - Singh, Aanya (Employee)',
      status: 'Completed',
      type: 'document',
      userType: 'Employee',
      user: { name: 'Inez Olendo', avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2' },
      startDate: '08/20/24 3:05 PM',
      completionDate: '08/20/24 3:05 PM',
      viewedAt: '2024-08-20T15:05:00Z', // Pre-viewed for testing
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // Expires in 2 hours for testing
      isExpired: false
    },
    {
      id: 4,
      name: 'Contract Extension - Wilson, James (External User)',
      status: 'Error',
      type: 'document',
      userType: 'External User',
      user: { name: 'Freddie Ty', avatar: null },
      startDate: '08/20/24 3:05 PM',
      completionDate: null,
      viewedAt: null,
      expiresAt: null,
      isExpired: false
    },
    {
      id: 5,
      name: 'Onboarding Workflow - Johnson, Sarah (Candidate) - REQ-1007',
      status: 'In Progress',
      type: 'process',
      userType: 'Candidate',
      user: { name: 'Peter Yap', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2' },
      startDate: '08/20/24 3:05 PM',
      completionDate: null,
      viewedAt: null,
      expiresAt: null,
      isExpired: false
    },
    // Add many more entries to reach 200+
    ...Array.from({ length: 195 }, (_, i) => ({
      id: i + 6,
      name: [
        'Background Check Authorization - Employee ',
        'Performance Review - Employee ',
        'Training Certificate - Employee ',
        'Exit Interview - Employee ',
        'Salary Adjustment Letter - Employee ',
        'Promotion Letter - Employee ',
        'Contract Renewal - External User ',
        'Equipment Assignment - External User ',
        'Interview Feedback - Candidate ',
        'Offer Letter - Candidate '
      ][i % 10] + `${i + 1} ${i % 3 === 0 ? '(Employee)' : i % 3 === 1 ? '(External User)' : '(Candidate)'} ${i % 3 === 2 ? `- REQ-${1001 + (i % 20)}` : ''}`,
      status: ['Completed', 'In Progress', 'Error'][i % 3],
      type: i % 2 === 0 ? 'document' : 'process',
      userType: ['Employee', 'External User', 'Candidate'][i % 3],
      user: {
        name: ['Andrea Cruz', 'Alexa Dee', 'Inez Olendo', 'Freddie Ty', 'Peter Yap'][i % 5],
        avatar: i % 3 === 0 ? `https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2` : null
      },
      startDate: '08/20/24 3:05 PM',
      completionDate: i % 3 === 0 ? '08/20/24 3:05 PM' : null,
      viewedAt: null,
      expiresAt: null,
      isExpired: false
    }))
  ];

  return generatedItems;
  });

  // Helper function to format time remaining until expiration
  const formatTimeRemaining = (expiresAt: string): string => {
    const now = new Date();
    const expiration = new Date(expiresAt);
    const diff = expiration.getTime() - now.getTime();
    
    if (diff <= 0) {
      return 'Expired';
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
    } else {
      return `${minutes}m`;
    }
  };

  // Handle viewing a document (starts expiration timer)
  const handleViewDocument = (id: number) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id && item.status === 'Completed' && !item.viewedAt) {
          const now = new Date();
          const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
          
          return {
            ...item,
            viewedAt: now.toISOString(),
            expiresAt: expiresAt.toISOString()
          };
        }
        return item;
      })
    );
  };

  // Check for expired documents every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prevItems => 
        prevItems.map(item => {
          if (item.expiresAt && !item.isExpired) {
            const now = new Date();
            const expiration = new Date(item.expiresAt);
            
            if (now >= expiration) {
              return {
                ...item,
                status: 'Expired',
                isExpired: true
              };
            }
          }
          return item;
        })
      );
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'documents' && item.type === 'document') ||
                         (activeFilter === 'processes' && item.type === 'process');
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3 ml-4">
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
            <Filter className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeFilter === 'all'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ALL
        </button>
        <button
          onClick={() => setActiveFilter('documents')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeFilter === 'documents'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          DOCUMENTS
        </button>
        <button
          onClick={() => setActiveFilter('processes')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeFilter === 'processes'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          PROCESSES
        </button>
      </div>

      {/* Generated Items Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 font-medium text-gray-900">Name</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">User</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Start Date ▲</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Completion Date</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr 
                key={item.id} 
                className={`hover:bg-gray-50 ${
                  index < filteredItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    {item.type === 'document' ? (
                      <FileText className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Users className="w-4 h-4 text-green-500" />
                    )}
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <div className="text-xs text-gray-500 mt-1">
                        User Type: {item.userType}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                    {item.isExpired && <AlertCircle className="w-3 h-3 mr-1" />}
                    {item.isExpired ? 'Expired' : item.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    {item.user.avatar ? (
                      <img
                        src={item.user.avatar}
                        alt={item.user.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {getInitials(item.user.name)}
                        </span>
                      </div>
                    )}
                    <span className="text-gray-600">{item.user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {item.startDate}
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {item.completionDate || '-'}
                </td>
                <td className="py-4 px-6">
                  {item.status === 'Completed' && !item.isExpired && (
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewDocument(item.id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="View Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-green-500 hover:text-green-700 transition-colors"
                        title="Download Document"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {item.status === 'Completed' && item.viewedAt && !item.isExpired && item.expiresAt && (
                    <div className="flex items-center space-x-1 text-orange-600" title={`Expires at ${new Date(item.expiresAt).toLocaleString()}`}>
                      <Clock className="w-3 h-3" />
                      <span className="text-xs font-medium">
                        {formatTimeRemaining(item.expiresAt)}
                      </span>
                    </div>
                  )}
                  {item.isExpired && (
                    <div className="flex items-center space-x-1 text-gray-400" title="Document has expired">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs">No longer accessible</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
          <span>Rows per page: 10 ▼</span>
          <span>1-9 of 9</span>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400">‹</button>
            <button className="text-gray-400">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};