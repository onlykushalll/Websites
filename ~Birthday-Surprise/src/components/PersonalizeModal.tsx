import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Upload, Check, Heart, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { BirthdayData, WishCard, MemoryPhoto } from '../types';
import { soundManager } from '../utils/audio';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BirthdayData;
  onSave: (updatedData: BirthdayData) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<BirthdayData>(() => JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState<'basic' | 'wishes' | 'photos'>('basic');

  useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(data)));
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newPhoto: MemoryPhoto = {
            id: `custom-${Date.now()}`,
            url: event.target.result as string,
            caption: `Happy Birthday ${formData.recipientName}! 🌸`,
            rotation: (Math.random() - 0.5) * 6,
            date: 'Special memory',
          };
          setFormData((prev) => ({
            ...prev,
            photos: [newPhoto, ...prev.photos],
          }));
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSave = () => {
    soundManager.playChime();
    onSave(formData);
    onClose();
  };

  return (
    <div
      id="personalize-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-serif-display text-lg font-bold">
              Personalize Birthday Surprise
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 px-4 pt-2 gap-2 text-xs font-semibold overflow-x-auto">
          {[
            { key: 'basic', label: '1. Names & Details' },
            { key: 'wishes', label: '2. 5 Cards & Letter' },
            { key: 'photos', label: '3. Photos & Memories' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-3.5 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-pink-500 text-pink-600 dark:text-pink-400 bg-white dark:bg-stone-900 rounded-t-lg'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm font-sans-ui text-stone-700 dark:text-stone-200">
          
          {/* TAB 1: BASIC DETAILS */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Recipient Name (Birthday Person)
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) =>
                      setFormData({ ...formData, recipientName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-pink-500"
                    placeholder="e.g. Siya, Maahi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Nickname / Sweet Title
                  </label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) =>
                      setFormData({ ...formData, nickname: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-pink-500"
                    placeholder="e.g. Manchurian, Munchkin"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Your Name (Sender)
                  </label>
                  <input
                    type="text"
                    value={formData.senderName}
                    onChange={(e) =>
                      setFormData({ ...formData, senderName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-pink-500"
                    placeholder="e.g. ice-cream 🍦 / Kushal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={formData.relationship}
                    onChange={(e) =>
                      setFormData({ ...formData, relationship: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-pink-500"
                    placeholder="e.g. Soul Bestie & Forever Person"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Birthday Date or Special Occasion
                </label>
                <input
                  type="text"
                  value={formData.birthdayDate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthdayDate: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-pink-500"
                  placeholder="e.g. Today & Always ✨"
                />
              </div>
            </div>
          )}

          {/* TAB 2: WISHES & LETTER */}
          {activeTab === 'wishes' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  The 5 Flip Cards:
                </label>

                {formData.wishes.map((w, idx) => (
                  <div
                    key={w.id}
                    className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-pink-600 dark:text-pink-400">
                      <span>Card #{idx + 1}</span>
                      <span className="font-mono text-stone-400">Tag: {w.frontTag}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={w.frontTitle}
                        onChange={(e) => {
                          const updated = [...formData.wishes];
                          updated[idx].frontTitle = e.target.value;
                          setFormData({ ...formData, wishes: updated });
                        }}
                        className="px-2.5 py-1.5 text-xs rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                        placeholder="Front Title"
                      />
                      <input
                        type="text"
                        value={w.frontSubtitle}
                        onChange={(e) => {
                          const updated = [...formData.wishes];
                          updated[idx].frontSubtitle = e.target.value;
                          setFormData({ ...formData, wishes: updated });
                        }}
                        className="px-2.5 py-1.5 text-xs rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                        placeholder="Front Subtitle"
                      />
                    </div>
                    <textarea
                      value={w.backText}
                      onChange={(e) => {
                        const updated = [...formData.wishes];
                        updated[idx].backText = e.target.value;
                        setFormData({ ...formData, wishes: updated });
                      }}
                      rows={2}
                      className="w-full px-2.5 py-1.5 text-xs rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-pink-500"
                      placeholder="Back of card message..."
                    />
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Heartfelt Letter:
                </label>
                <input
                  type="text"
                  value={formData.letterTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, letterTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 font-mono"
                  placeholder="Letter Title Banner"
                />
                <input
                  type="text"
                  value={formData.letterGreeting}
                  onChange={(e) =>
                    setFormData({ ...formData, letterGreeting: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 font-serif-display font-bold"
                  placeholder="Dear Manchurian 🌸,"
                />
                <textarea
                  value={formData.letterBody}
                  onChange={(e) =>
                    setFormData({ ...formData, letterBody: e.target.value })
                  }
                  rows={5}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-pink-500 leading-relaxed font-serif-body"
                  placeholder="Write your emotional heartfelt letter..."
                />
                <input
                  type="text"
                  value={formData.letterSignoff}
                  onChange={(e) =>
                    setFormData({ ...formData, letterSignoff: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 font-serif-display"
                  placeholder="Signoff / Sign-out text"
                />
              </div>
            </div>
          )}

          {/* TAB 3: PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs">Polaroid Keepsakes</h4>
                  <p className="text-[11px] text-stone-500">
                    Add special photos and memory captions
                  </p>
                </div>

                <label className="cursor-pointer px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {formData.photos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className="p-2 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 space-y-2"
                  >
                    <div className="h-28 w-full rounded-lg overflow-hidden bg-stone-200 dark:bg-stone-700">
                      <img
                        src={photo.url}
                        alt="Memory"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <input
                      type="text"
                      value={photo.caption}
                      onChange={(e) => {
                        const updated = [...formData.photos];
                        updated[idx].caption = e.target.value;
                        setFormData({ ...formData, photos: updated });
                      }}
                      className="w-full px-2 py-1 text-[11px] rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                      placeholder="Photo caption"
                    />
                    <input
                      type="text"
                      value={photo.date || ''}
                      onChange={(e) => {
                        const updated = [...formData.photos];
                        updated[idx].date = e.target.value;
                        setFormData({ ...formData, photos: updated });
                      }}
                      className="w-full px-2 py-1 text-[10px] text-stone-500 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                      placeholder="Date / Label"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 dark:bg-stone-800/80 px-6 py-3.5 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 text-xs font-medium"
          >
            Cancel
          </button>

          <button
            id="btn-save-personalization"
            onClick={handleSave}
            className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold rounded-lg shadow-md shadow-pink-500/20 flex items-center gap-1.5 transition-all transform active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Save &amp; View Surprise</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
