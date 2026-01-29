import React from 'react';
import type {KeyResult} from '../Types/okr_types.ts';

type props = {
    setKeyResults: React.Dispatch<React.SetStateAction<KeyResult[]>>;
};

const KeyResultListForm = ({setKeyResults}: props) => {
    const [keyResult, setKeyResult] = React.useState<KeyResult>({
        description: '',
        progress: '',
    });


    const isDisabled = !(keyResult.description != '' && keyResult.progress != '');

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
                onChange={(e) => {
                    setKeyResult({...keyResult, description: e.target.value});

                }}
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
                onChange={(e) => {
                    setKeyResult({...keyResult, progress: e.target.value});
                }}
            />
            <button
                type="button"
                disabled={isDisabled}
                className={`border rounded-md px-3 py-1 ${isDisabled ? 'bg-gray-500  hover:cursor-not-allowed ' : ' bg-green-500 hover:cursor-pointer'} text-white`}
                onClick={() => {
                    setKeyResults((prev) => {
                        return [...prev, keyResult];
                    });
                }}
            >
                Add Key Result
            </button>
        </div>
    );
};

export default KeyResultListForm;
