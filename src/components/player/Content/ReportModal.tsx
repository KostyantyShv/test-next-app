'use client';

import { FC, useState, useEffect } from 'react';
import { Icon, IconName } from '@/components/ui/Icon';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReportData) => void;
}

export interface ReportData {
  reasons: string[];
  feedback?: string;
}

const reportOptions = [
  { id: 'inaccurate', label: 'Inaccurate', icon: 'warning' },
  { id: 'outdated', label: 'Out of date', icon: 'clock' },
  { id: 'tooShort', label: 'Too short', icon: 'minimize' },
  { id: 'tooLong', label: 'Too long', icon: 'maximize' },
  { id: 'harmful', label: 'Harmful or offensive', icon: 'flag' },
  { id: 'notHelpful', label: 'Not helpful', icon: 'x-circle' },
];

export const ReportModal: FC<ReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedReasons([]);
      setFeedback('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedReasons.length > 0) {
      onSubmit({
        reasons: selectedReasons,
        feedback: feedback.trim() || undefined,
      });
      onClose();
    }
  };

  const toggleReason = (id: string) => {
    setSelectedReasons(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id)
        : [...prev, id]
    );
  };

  const isSubmitDisabled = selectedReasons.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-2xl">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Help us improve</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icon name="close" className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-6">
            Provide additional feedback on this content. Select all that apply.
          </p>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {reportOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => toggleReason(option.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                  selectedReasons.includes(option.id)
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon name={option.icon as IconName} className="w-5 h-5" />
                <span className="text-base">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Feedback Input */}
          <div>
            <label className="block text-base text-gray-700 mb-2">
              How can the content be improved? (optional)
            </label>
            <input
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-base"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 bg-gray-200 rounded-b-xl border-t border-gray-300">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-600 bg-white hover:bg-gray-100 rounded-lg transition-colors text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`px-6 py-2.5 rounded-lg transition-colors text-base font-medium ${
              isSubmitDisabled 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}; 