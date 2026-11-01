import { useState } from 'react';
import { CreditCard, TrendingUp, DollarSign, Eye } from 'lucide-react';
import { Badge } from '../../components/ui';
import { mockDonations } from '../../services/mock/mockData';
import { useAuth } from '../../context/AuthContext';

const DonationsAdminPage = () => {
  const { hasRole } = useAuth();
  const [donations] = useState(mockDonations);

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const byPurpose = donations.reduce((acc, d) => {
    acc[d.purpose] = (acc[d.purpose] || 0) + d.amount;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-primary mb-1">Donations</h1>
        <p className="text-gray-500 text-sm">View and manage donation records</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center mb-3">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-primary">₦{totalAmount.toLocaleString()}</div>
          <div className="text-xs text-gray-400 mt-0.5">Total Received</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-3">
            <CreditCard className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-primary">{donations.length}</div>
          <div className="text-xs text-gray-400 mt-0.5">Total Donations</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-primary">
            ₦{Math.round(totalAmount / donations.length).toLocaleString()}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Avg. Donation</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-3">
            <CreditCard className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-primary">
            ₦{Math.max(...donations.map((d) => d.amount)).toLocaleString()}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Highest Gift</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transactions Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-primary text-sm">Recent Transactions</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Purpose</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {donations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{donation.purpose}</div>
                        <div className="text-xs text-gray-400">{donation.donor?.name || 'Anonymous'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs hidden sm:table-cell">
                    {new Date(donation.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-primary">
                    ₦{donation.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant="success">{donation.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* By Purpose Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-primary text-sm mb-4">By Purpose</h2>
          <div className="space-y-3">
            {Object.entries(byPurpose).map(([purpose, amount]) => (
              <div key={purpose}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">{purpose}</span>
                  <span className="font-semibold text-primary text-xs">₦{amount.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-gradient rounded-full transition-all"
                    style={{ width: `${(amount / totalAmount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationsAdminPage;
