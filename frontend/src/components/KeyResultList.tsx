import { motion, AnimatePresence } from 'framer-motion';
import { KeyResultContext } from '../Contexts/KeyResultContext';
import type { KeyResult } from '../Types/okr_types';
import { useState, useContext } from 'react';

export default function KeyResultList() {
   const { keyResultList, updateKeyResult, removeKeyResult } =
      useContext(KeyResultContext);
   const [editingId, setEditingId] = useState<number | null>(null);
   const [editProgress, setEditProgress] = useState('');
   const [editDescription, setEditDescription] = useState('');

   if (!keyResultList || keyResultList.length === 0) {
      return (
         <div className="mt-6 flex flex-col items-center text-gray-400 py-8">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-12 w-12 mb-2"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
               />
            </svg>
            <p className="text-sm italic">No key results added yet</p>
         </div>
      );
   }

   const handleEditClick = (kr: KeyResult) => {
      setEditingId(kr.id);
      setEditProgress(kr.progress.toString());
      setEditDescription(kr.description);
   };

   const handleSaveEdit = (kr: KeyResult) => {
      const numericProgress = Math.min(
         100,
         Math.max(0, Number(editProgress) || 0)
      );

      if (updateKeyResult) {
         updateKeyResult(kr.id, {
            ...kr,
            description: editDescription.trim(),
            progress: numericProgress.toString(),
         });
      }

      setEditingId(null);
      setEditProgress('');
      setEditDescription('');
   };

   const handleCancelEdit = () => {
      setEditingId(null);
      setEditProgress('');
      setEditDescription('');
   };

   const handleRemove = (id: number) => {
      if (removeKeyResult) {
         removeKeyResult(id);
      }
   };

   const getProgressColor = (progress: number) => {
      if (progress >= 70) return 'bg-emerald-500';
      if (progress >= 40) return 'bg-amber-500';
      return 'bg-rose-400';
   };

   return (
      <div className="mt-6 max-w-md mx-auto space-y-3">
         <AnimatePresence>
            {keyResultList.map((kr) => {
               const progress = Number(kr.progress);
               const isEditing = editingId === kr.id;

               return (
                  <motion.div
                     key={kr.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, x: -50 }}
                     layout
                     className={`p-4 rounded-xl border transition-all duration-200 ${
                        isEditing
                           ? 'bg-blue-50 border-blue-300 shadow-md'
                           : 'bg-white border-gray-200 hover:shadow-sm'
                     }`}
                  >
                     {isEditing ? (
                        <div className="space-y-3">
                           <input
                              type="text"
                              value={editDescription}
                              onChange={(e) =>
                                 setEditDescription(e.target.value)
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                              placeholder="Description"
                           />
                           <div className="flex items-center gap-3">
                              <label className="text-xs text-gray-500">
                                 Progress:
                              </label>
                              <input
                                 type="range"
                                 min="0"
                                 max="100"
                                 value={editProgress}
                                 onChange={(e) =>
                                    setEditProgress(e.target.value)
                                 }
                                 className="flex-1 h-2 accent-blue-600"
                              />
                              <input
                                 type="number"
                                 min="0"
                                 max="100"
                                 value={editProgress}
                                 onChange={(e) =>
                                    setEditProgress(e.target.value)
                                 }
                                 className="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded-lg"
                              />
                              <span className="text-xs text-gray-500">%</span>
                           </div>
                           <div className="flex justify-end gap-2 pt-2">
                              <button
                                 onClick={handleCancelEdit}
                                 className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                              >
                                 Cancel
                              </button>
                              <button
                                 onClick={() => handleSaveEdit(kr)}
                                 className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                 Save
                              </button>
                           </div>
                        </div>
                     ) : (
                        <div className="flex items-center gap-3">
                           <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800 font-medium truncate">
                                 {kr.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                 <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                       initial={{ width: 0 }}
                                       animate={{ width: `${progress}%` }}
                                       className={`h-full ${getProgressColor(progress)} rounded-full`}
                                    />
                                 </div>
                                 <span className="text-xs font-semibold text-gray-600 w-10 text-right">
                                    {progress}%
                                 </span>
                              </div>
                           </div>
                           <div className="flex gap-1">
                              <button
                                 onClick={() => handleEditClick(kr)}
                                 className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                 title="Edit"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                 </svg>
                              </button>
                              <button
                                 onClick={() => handleRemove(kr.id)}
                                 className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                 title="Remove"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                 </svg>
                              </button>
                           </div>
                        </div>
                     )}
                  </motion.div>
               );
            })}
         </AnimatePresence>
      </div>
   );
}
