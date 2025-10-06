import React, { useState } from 'react';
import { Search, Eye, FileText, Users, Filter, Download, Clock, AlertCircle } from 'lucide-react';

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
}

export const GeneratedDocsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'documents' | 'processes'>('all');
  const [items, setItems] = useState<GeneratedItem[]>(() => {

    const initialItems: GeneratedItem[] = [
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
      viewedAt: null,
      expiresAt: null,
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

    return initialItems;
  });

  // Check for expired documents on component mount and periodically
  React.useEffect(() => {
    const checkExpiredDocuments = () => {
      const now = new Date();
      setItems(prevItems => 
        prevItems.map(item => {
          if (item.status === 'Completed' && item.expiresAt && !item.isExpired) {
            const expirationDate = new Date(item.expiresAt);
            if (now >= expirationDate) {
              return { ...item, isExpired: true, status: 'Expired' };
            }
          }
          return item;
        })
      );
    };

    // Check immediately
    checkExpiredDocuments();

    // Check every minute for expired documents
    const interval = setInterval(checkExpiredDocuments, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleViewDocument = (itemId: number) => {
    const now = new Date();
    const expirationTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId && item.status === 'Completed' && !item.viewedAt) {
          return {
            ...item,
            viewedAt: now.toISOString(),
            expiresAt: expirationTime.toISOString()
          };
        }
        return item;
      })
    );

    // Simulate opening document viewer
    alert(`Opening document: ${items.find(item => item.id === itemId)?.name}`);
  };

  const handleDownloadDocument = (itemId: number) => {
    // Simulate download
    const item = items.find(item => item.id === itemId);
    if (item) {
      alert(`Downloading document: ${item.name}`);
    }
  };

  const getTimeUntilExpiration = (expiresAt: string) => {
    const now = new Date();
    const expiration = new Date(expiresAt);
    const hoursLeft = Math.max(0, Math.ceil((expiration.getTime() - now.getTime()) / (1000 * 60 * 60)));
    return hoursLeft;
  };

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
      case 'Expired': return 'bg-gray-100 text-gray-800';
      case 'No longer accessible': return 'bg-gray-100 text-gray-600';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
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
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
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
                  <div className="flex items-center space-x-2">
                    {item.status === 'Completed' && !item.isExpired && (
                      <>
                        <button 
                          onClick={() => handleViewDocument(item.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDownloadDocument(item.id)}
                          className="text-green-600 hover:text-green-800 transition-colors"
                          title="Download document"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {item.status === 'Completed' && item.viewedAt && !item.isExpired && item.expiresAt && (
                      <div className="flex items-center text-orange-600" title={`Expires in ${getTimeUntilExpiration(item.expiresAt)} hours`}>
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-xs">{getTimeUntilExpiration(item.expiresAt)}h</span>
                      </div>
                    )}
                    {(item.status === 'Expired' || item.isExpired) && (
                      <div className="flex items-center text-gray-500" title="Document has expired and is no longer accessible">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-xs">Expired</span>
                      </div>
                    )}
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