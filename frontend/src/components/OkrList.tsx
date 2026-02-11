import type { ObjectiveState } from '../types/okr_types.ts';
import { KeyResult } from './KeyResult.tsx';
import { ObjectiveMenu } from './ObjectiveMenu.tsx';

interface OkrListProps {
    okrList: ObjectiveState[];
    onEdit: (okr: ObjectiveState) => void;
    onDelete: (okrId: string) => void;
}

const OkrList = ({ okrList, onEdit, onDelete }: OkrListProps) => {
    return (
        <div className={'my-5 flex flex-col items-center gap-3 w-full'}>
            {okrList.map((okr) => {
                return (
                    <div
                        key={okr.id}
                        className={
                            'w-full max-w-120 rounded-lg bg-white p-5 border border-gray-200 shadow-sm'
                        }
                    >
                        <div className="flex flex-row justify-between ">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {okr.title}
                            </h2>
                            <ObjectiveMenu
                                okr={okr}
                                onAddKeyResult={() => {}}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </div>
                        <div className={'mt-3 divide-y divide-gray-200'}>
                            {okr.keyResults.map((keyResult) => (
                                <KeyResult keyResult={keyResult} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default OkrList;
