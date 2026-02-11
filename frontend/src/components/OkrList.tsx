import type { KeyResult, OkrType } from '../Types/okr_types.ts';

interface OkrListProps {
   okrs: OkrType[];
   onEdit?: (okr: OkrType) => void;
   onDelete?: (id: string | number) => void;
}

function KeyResultItem({ kr, index }: { kr: KeyResult; index: number }) {
   const progressColor =
      Number(kr.progress) >= 70
         ? 'bg-emerald-500'
         : Number(kr.progress) >= 40
           ? 'bg-amber-500'
           : 'bg-rose-400';

   return (
      <li className={`flex items-center justify-between py-3 border-b border-gray-100 last:border-0 rounded-lg px-3 ${
         index % 2 !== 0 && 'bg-pink-100'
      }`}>
         <span className="text-gray-700 text-base flex-1 pr-4">
            {kr.description}
         </span>
         <div className="flex items-center gap-4 min-w-40">
            <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
               <div
                  className={`h-full ${progressColor} rounded-full transition-all duration-300`}
                  style={{ width: `${kr.progress}%` }}
               />
            </div>
            <span className="text-sm font-medium text-gray-600 w-12 text-right">
               {kr.progress}%
            </span>
         </div>
      </li>
   );
}

function KeyResultList({ keyResults = [] }: { keyResults: KeyResult[] }) {
   if (keyResults.length === 0) {
      return (
         <p className="text-gray-400 text-sm italic py-2">
            No key results added
         </p>
      );
   }

   return (
      <ul>
         {keyResults.map((kr, index) => (
            <KeyResultItem key={kr.id} kr={kr} index={index} />
         ))}
      </ul>
   );
}

const OkrList = ({ okrs, onEdit, onDelete }: OkrListProps) => {
   if (okrs.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-20 w-20 mb-4"
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
            <p className="text-xl font-medium">No OKRs yet</p>
            <p className="text-base mt-1">
               Click "Add OKR" to create your first objective
            </p>
         </div>
      );
   }

   return (
      <div className="w-full h-full overflow-y-auto px-2">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            {okrs.map((okr) => (
               <div
                  key={okr.id}
                  className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
               >
                  <div className="flex items-start justify-between mb-4 pb-3 border-b border-gray-100">
                     <h2 className="text-xl font-semibold text-gray-800 leading-snug flex-1">
                        {okr.title}
                     </h2>
                     <div className="flex items-center gap-2 ml-4">
                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full whitespace-nowrap font-medium">
                           {okr.keyResults?.length || 0} KRs
                        </span>
                        <button
                           onClick={() => onEdit?.(okr)}
                           className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                           title="Edit OKR"
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
                           onClick={() => {
                              const confirmed = window.confirm(
                                 'Are you sure you want to delete this OKR?'
                              );
                              if (confirmed) {
                                 onDelete?.(okr.id);
                              }
                           }}
                           className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                           title="Delete OKR"
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
                  <KeyResultList keyResults={okr.keyResults} />
               </div>
            ))}
         </div>
      </div>
   );
};

export default OkrList;
