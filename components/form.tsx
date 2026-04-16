'use client';

import { useTransition, useState } from 'react';
import { User, Phone } from 'lucide-react';
import { submitContactForm } from '@/lib/actions';
import { SuccessDialog } from '@/components/ui/success-dialog'
import { useRefresh } from '@/components/dashboard/refresh-context'

export function AssignmentForm() {
  const { refresh } = useRefresh()
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isPending, startTransition] = useTransition();
  const [successOpen, setSuccessOpen] = useState(false)
  const [status, setStatus] = useState<
    { type: 'idle' } | { type: 'success'; message: string } | { type: 'error'; message: string }
  >({ type: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({ type: 'error', message: 'Name and phone number are required.' });
      return;
    }
    
    // Very basic phone plausibility check (e.g. at least 7 digits)
    const phoneRegex = /^[\d\s\-+()]{5,20}$/;
    if (!phoneRegex.test(formData.phone)) {
      setStatus({ type: 'error', message: 'Please enter a valid phone number.' });
      return;
    }

    startTransition(async () => {
      try {
        const result = await submitContactForm(formData);
        if (result.success) {
          setFormData({ name: '', phone: '' });
          setStatus({ type: 'idle' });
          setSuccessOpen(true)
          refresh()
        } else {
          setStatus({ type: 'error', message: result.error || 'Failed to save data.' });
        }
      } catch {
        setStatus({ type: 'error', message: 'An unexpected error occurred.' });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status.type === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm font-medium flex items-center justify-between">
          <span>{status.message}</span>
          <button 
            type="button" 
            onClick={() => setStatus({ type: 'idle' })} 
            className="text-red-600 hover:text-red-900 ml-2"
          >
            ×
          </button>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
          Full Name
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
            <User size={18} />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={isPending}
            className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 text-gray-900 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all disabled:opacity-50"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
          Phone Number
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
            <Phone size={18} />
          </div>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            disabled={isPending}
            className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 text-gray-900 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all disabled:opacity-50"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow-indigo-500/25 transition-all focus:ring-4 focus:ring-indigo-100 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center transform active:scale-[0.98]"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Saving...
          </span>
        ) : (
          'Submit & Save'
        )}
      </button>

      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title="Saved"
        message="Your information was saved successfully."
      />
    </form>
  );
}
