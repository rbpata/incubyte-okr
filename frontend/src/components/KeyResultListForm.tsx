import { motion } from 'framer-motion';
import type { KeyResult } from '../Types/okr_types.ts';
import { KeyResultContext } from '../Contexts/KeyResultContext';
import { useContext } from 'react';
import React from 'react';

const KeyResultListForm = () => {
   const [keyResult, setKeyResult] = React.useState<KeyResult>({
      id: 0,
      description: '',
      progress: '',
   });

   const { addKeyResult } = useContext(KeyResultContext);

   const isDisabled = !(keyResult.description && keyResult.progress);

   function handleAddKeyResult() {
      if (addKeyResult) {
         addKeyResult({
            description: keyResult.description,
            progress: keyResult.progress,
         });
      }
      setKeyResult({ id: 0, description: '', progress: '' });
   }

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.4 }}
         className="max-w-md mx-auto mt-6 rounded-xl bg-white/70 backdrop-blur border border-gray-200 shadow-lg p-6 space-y-4"
      >
         <h2 className="text-xl font-semibold text-gray-800 text-center">
            Add Key Result{' '}
         </h2>

         <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
               Description{' '}
            </label>
            <input
               type="text"
               value={keyResult.description}
               onChange={(e) =>
                  setKeyResult({ ...keyResult, description: e.target.value })
               }
               className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
               placeholder="Learn React Basics.."
            />
         </div>

         <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
               Progress{' '}
            </label>
            <input
               type="number"
               min="0"
               max="100"
               value={keyResult.progress}
               onChange={(e) =>
                  setKeyResult({ ...keyResult, progress: e.target.value })
               }
               className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
               placeholder="e.g.40"
            />
         </div>

         <motion.button
            whileHover={isDisabled ? {} : { scale: 1.03 }}
            whileTap={isDisabled ? {} : { scale: 0.96 }}
            disabled={isDisabled}
            onClick={handleAddKeyResult}
            className={`w-full rounded-lg py-2 font-medium text-white transition-all ${
               isDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-linear-to-r bg-blue-600 hover:shadow-lg'
            }`}
         >
            Add Key Result{' '}
         </motion.button>
      </motion.div>
   );
};

export default KeyResultListForm;
