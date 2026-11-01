import { useState } from 'react';
import { Building2, Users, Plus, Edit } from 'lucide-react';
import { Badge, EmptyState } from '../../components/ui';
import { mockDepartments } from '../../services/mock/mockData';
import { useAuth } from '../../context/AuthContext';

const DepartmentsPage = () => {
  const { hasRole } = useAuth();
  const [departments] = useState(mockDepartments);

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary mb-1">Departments</h1>
          <p className="text-gray-500 text-sm">Manage church departments and member assignments</p>
        </div>
        {hasRole('ADMIN') && (
          <button className="btn-primary text-sm" id="add-department">
            <Plus className="w-4 h-4" /> Add Department
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-accent/30 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <Building2 className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              {hasRole('ADMIN') && (
                <button className="p-1.5 rounded-lg text-gray-300 hover:text-accent hover:bg-accent/10 transition-colors opacity-0 group-hover:opacity-100">
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
            <h3 className="font-semibold text-primary mb-1 group-hover:text-accent transition-colors">{dept.name}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{dept.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Users className="w-3.5 h-3.5" />
                {dept.memberCount} members
              </div>
              <Badge variant={dept.isActive ? 'success' : 'default'}>
                {dept.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentsPage;
