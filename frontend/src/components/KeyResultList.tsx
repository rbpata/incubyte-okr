import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyResultContext } from '../Contexts/KeyResultContext';
import type { KeyResult } from '../Types/okr_types';

const BASE_URL = 'http://localhost:3000';

export default function KeyResultList() {
   const { keyResultList, updateKeyResult, removeKeyResult } =
      useContext(KeyResultContext);
   const [editingId, setEditingId] = useState<number | null>(null);
   const [editProgress, setEditProgress] = useState('');

   if (!keyResultList || keyResultList.length === 0) {
      return (
         <p className="mt-6 text-center text-gray-500 italic">
            No key results added yet
         </p>
      );
   }

   const handleEditClick = (kr: KeyResult) => {
      setEditingId(kr.id);
      setEditProgress(kr.progress);
   };

   const handleSaveEdit = async (kr: KeyResult) => {
      try {
         // Update progress on backend
         const response = await fetch(`${BASE_URL}/okr/key-results/${kr.id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               Authorization: 'secretkey',
            },
            body: JSON.stringify({
               description: kr.description,
               progress: editProgress,
            }),
         });

         if (!response.ok) {
            throw new Error('Failed to update key result');
         }

         const updatedKR = await response.json();

         // Update local context
         if (updateKeyResult) {
            updateKeyResult(kr.id, { ...kr, progress: editProgress });
         }

         setEditingId(null);
         setEditProgress('');
      } catch (error) {
         console.error('Error updating key result:', error);
         alert('Failed to update key result progress');
      }
   };

   const handleCancelEdit = () => {
      setEditingId(null);
      setEditProgress('');
   };

   const handleRemove = async (id: number) => {
      try {
         const response = await fetch(`${BASE_URL}/okr/key-results/${id}`, {
            method: 'DELETE',
            headers: {
               Authorization: 'secretkey',
            },
         });

         if (!response.ok) {
            throw new Error('Failed to delete key result');
         }

         if (removeKeyResult) {
            removeKeyResult(id);
         }
      } catch (error) {
         console.error('Error deleting key result:', error);
         alert('Failed to delete key result');
      }
   };

   return (
      <div className="mt-6 max-w-md mx-auto space-y-3">
         <AnimatePresence>
            {keyResultList.map((kr) => (
               <motion.div
                  key={kr.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                     scale: 1.02,
                     boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  }}
                  className="rounded-xl bg-white border border-gray-200 p-4 transition-all"
               >
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="font-semibold text-gray-800 flex-1 pr-2">
                        {kr.description}
                     </h3>
                     <div className="flex items-center gap-2">
                        {editingId === kr.id ? (
                           <div className="flex items-center gap-1">
                              <input
                                 type="number"
                                 min="0"
                                 max="100"
                                 value={editProgress}
                                 onChange={(e) =>
                                    setEditProgress(e.target.value)
                                 }
                                 className="w-16 text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                              />
                              <button
                                 onClick={() => handleSaveEdit(kr)}
                                 className="text-green-600 hover:text-green-700 p-1"
                                 title="Save"
                              >
                                 ✓
                              </button>
                              <button
                                 onClick={handleCancelEdit}
                                 className="text-red-600 hover:text-red-700 p-1"
                                 title="Cancel"
                              >
                                 ✕
                              </button>
                           </div>
                        ) : (
                           <>
                              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                 {`${kr.progress}%`}
                              </span>
                              <button
                                 onClick={() => handleEditClick(kr)}
                                 className="text-gray-400 hover:text-blue-600 p-1"
                                 title="Edit progress"
                              >
                                 ✏️
                              </button>
                              <button
                                 onClick={() => handleRemove(kr.id)}
                                 className="text-gray-400 hover:text-red-600 p-1"
                                 title="Remove"
                              >
                                 🗑️
                              </button>
                           </>
                        )}
                     </div>
                  </div>

                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                     <div
                        className="h-full bg-gradient-to-r from-blue-300 to-blue-500 transition-all"
                        style={{
                           width: `${parseInt(editingId === kr.id ? editProgress : kr.progress) || 0}%`,
                        }}
                     />
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
   );
}
