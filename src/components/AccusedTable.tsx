/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus, Trash2 } from 'lucide-react';
import { Accused } from '../types';

interface Props {
  accusedList: Accused[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof Accused, value: string) => void;
}

export default function AccusedTable({ accusedList, onAdd, onRemove, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-accent text-[10px] uppercase font-bold tracking-wider">Accused Details</h4>
        <button
          onClick={onAdd}
          className="text-[10px] uppercase font-bold flex items-center gap-1 bg-accent/10 text-accent border border-border-gold px-2 py-1 rounded hover:bg-accent/20 transition-all"
        >
          <Plus className="w-3 h-3" />
          Add Accused
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-border-gold">
              <th className="py-1 px-2 text-accent/60 font-medium uppercase text-[9px]">Name</th>
              <th className="py-1 px-2 text-accent/60 font-medium uppercase text-[9px]">Father</th>
              <th className="py-1 px-2 text-accent/60 font-medium uppercase text-[9px]">Caste</th>
              <th className="py-1 px-2 text-accent/60 font-medium uppercase text-[9px]">Address</th>
              <th className="py-1 px-2 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {accusedList.map((accused) => (
              <tr key={accused.id} className="border-b border-white/5 group hover:bg-white/[0.02]">
                <td className="py-1.5 px-0.5">
                  <input
                    type="text"
                    value={accused.name}
                    onChange={(e) => onChange(accused.id, 'name', e.target.value)}
                    className="w-full input-thematic rounded px-2 py-1 text-xs"
                  />
                </td>
                <td className="py-1.5 px-0.5">
                  <input
                    type="text"
                    value={accused.father}
                    onChange={(e) => onChange(accused.id, 'father', e.target.value)}
                    className="w-full input-thematic rounded px-2 py-1 text-xs"
                  />
                </td>
                <td className="py-1.5 px-0.5">
                  <input
                    type="text"
                    value={accused.caste}
                    onChange={(e) => onChange(accused.id, 'caste', e.target.value)}
                    className="w-full input-thematic rounded px-2 py-1 text-xs"
                  />
                </td>
                <td className="py-1.5 px-0.5">
                  <input
                    type="text"
                    value={accused.address}
                    onChange={(e) => onChange(accused.id, 'address', e.target.value)}
                    className="w-full input-thematic rounded px-2 py-1 text-xs"
                  />
                </td>
                <td className="py-1.5 px-0.5 text-center">
                  {accusedList.length > 1 && (
                    <button
                      onClick={() => onRemove(accused.id)}
                      className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-300"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
