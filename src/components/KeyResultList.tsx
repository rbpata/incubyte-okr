import { useContext } from 'react';
import { KeyResultContext } from '../Provider/KeyResultProvider.tsx';

export default function KeyResultList() {
   const { keyResultList } = useContext(KeyResultContext);
   if (!keyResultList || keyResultList.length === 0) {
      return <div className="mt-4">No key results</div>;
   }

   return (
      <div className="mt-4">
         {keyResultList.map((kr, idx) => (
            <div key={idx} className="border rounded p-2 mb-2 bg-white">
               <div className="font-semibold">{kr.description}</div>
               <div className="text-sm">Progress: {kr.progress}</div>
            </div>
         ))}
      </div>
   );
}
