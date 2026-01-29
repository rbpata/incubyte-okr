import type { KeyResult } from '../Types/okr_types';

type Props = {
   keyResults: KeyResult[];
};

export default function KeyResultList({ keyResults }: Props) {
   if (!keyResults || keyResults.length === 0) {
      return <div className="mt-4">No key results</div>;
   }

   return (
      <div className="mt-4">
         {keyResults.map((kr, idx) => (
            <div key={idx} className="border rounded p-2 mb-2 bg-white">
               <div className="font-semibold">{kr.description}</div>
               <div className="text-sm">Progress: {kr.progress}</div>
            </div>
         ))}
      </div>
   );
}
