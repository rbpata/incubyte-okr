import React, { useContext } from 'react';
import type { KeyResult } from '../Types/okr_types.ts';
import { KeyResultContext } from '../Provider/KeyResultProvider.tsx';

const KeyResultListForm = () => {
   const [keyResult, setKeyResult] = React.useState<KeyResult>({
      description: '',
      progress: '',
   });
   const { setKeyResultList } = useContext(KeyResultContext);
   const isDisabled = !(
      keyResult.description != '' && keyResult.progress != ''
   );

   function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
      setKeyResult({ ...keyResult, description: e.target.value });
   }

   function handleProgressChange(e: React.ChangeEvent<HTMLInputElement>) {
      setKeyResult({ ...keyResult, progress: e.target.value });
   }

   function resetKeyResultValues() {
      setKeyResult({ description: '', progress: '' });
   }

   function handleAddKeyResult() {
      setKeyResultList((prev) => {
         return [...prev, keyResult];
      });
      resetKeyResultValues();
   }

   return (
      <div className="flex flex-col item-center gap-2 border p-4  rounded-md bg-gray-200">
         <label id={'keyResultDescription'}>Add a Key Result Description</label>
         <input
            type="text"
            className={' rounded-md  border'}
            id={'keyResultDescription-input'}
            name="keyResultDescription"
            value={keyResult.description}
            min={5}
            minLength={5}
            onChange={handleDescriptionChange}
            required={true}
         />
         <label id="keyResultProgress">Add a Key Result Progress</label>
         <input
            type="text"
            className={' rounded-md  border'}
            id={'keyResultProgress-input'}
            name="keyResultProgress"
            value={keyResult.progress}
            required={true}
            min={5}
            onChange={handleProgressChange}
         />
         <button
            type="button"
            disabled={isDisabled}
            className={`border rounded-md px-3 py-1 ${isDisabled ? 'bg-gray-500  hover:cursor-not-allowed ' : ' bg-green-500 hover:cursor-pointer'} text-white`}
            onClick={handleAddKeyResult}
         >
            Add Key Result
         </button>
      </div>
   );
};

export default KeyResultListForm;
