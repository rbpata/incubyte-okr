import React, { useContext } from 'react';
import KeyResultForm from './KeyResultForm.tsx';
import KeyResultList from './KeyResultList.tsx';
import { KeyResultContext } from '../contexts/KeyResultProvider.tsx';
import type { Okr } from '../types/okr_types.ts';

export default function OkrForm({
    setFetchOkr,
}: {
    setFetchOkr: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { keyResultList } = useContext(KeyResultContext);
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const objective = new FormData(e.currentTarget).get('objective');
        if (!objective || !keyResultList) {
            return;
        }
        if (keyResultList.length == 0) {
            alert('Please add Key Results');
            return;
        }
        const okr: Okr = {
            id: Math.floor(Math.random() * (100 - 10) + 10).toString(),
            objective: objective.toString(),
            keyResults: keyResultList,
        };
        fetch('http://localhost:3000/okr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(okr),
        }).then(() => {
            setFetchOkr(true);
            alert('Okr added');
        });
    };

    return (
        <div
            className={
                'flex w-full min-h-screen justify-center items-center border font-mono'
            }
        >
            <form
                className={
                    'flex flex-col w-125 min-h-[90vh] max-h-[90vh] gap-4 p-10 rounded-md shadow-xl bg-gray-100'
                }
                onSubmit={handleSubmit}
            >
                <p className={'font-bold text-5xl'}>OKR Form</p>
                <div className="flex flex-col item-center justify-center gap-2">
                    <label id="objective-label">Add an Objective</label>
                    <input
                        type="text"
                        className={'rounded-md  border px-3 py-2'}
                        id={'objective-input'}
                        name="objective"
                        placeholder={'Enter an Objective'}
                        required={true}
                    />
                </div>
                <KeyResultForm />
                <div className={'flex gap-4 justify-center'}>
                    <button
                        className={
                            'border rounded-md px-3 py-1.5 bg-gray-700 text-white'
                        }
                    >
                        Submit
                    </button>
                    <button
                        type="reset"
                        className={'border rounded-md px-3 py-1 bg-gray-300'}
                    >
                        Clear
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto border rounded-md px-3 py-2 bg-white">
                    <KeyResultList />
                </div>
            </form>
        </div>
    );
}
