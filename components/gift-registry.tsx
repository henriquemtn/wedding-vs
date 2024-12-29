'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GiftIcon } from 'lucide-react';

interface Gift {
  id: number;
  name: string;
  assignedTo: string | null;
}

const initialGifts: Gift[] = [
  { id: 1, name: 'Jogo de Toalhas', assignedTo: null },
  { id: 2, name: 'Conjunto de Panelas', assignedTo: null },
  { id: 3, name: 'Máquina de Café', assignedTo: null },
  { id: 4, name: 'Jogo de Talheres', assignedTo: null },
  { id: 5, name: 'Liquidificador', assignedTo: null },
  { id: 6, name: 'Jogo de Lençóis', assignedTo: null },
];

export const GiftRegistry: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);
  const [name, setName] = useState('');
  const [selectedGift, setSelectedGift] = useState<number | null>(null);

  const handleAssign = () => {
    if (selectedGift !== null && name.trim() !== '') {
      setGifts(gifts.map(gift => 
        gift.id === selectedGift ? { ...gift, assignedTo: name.trim() } : gift
      ));
      setName('');
      setSelectedGift(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
        <div className="flex gap-2">
          <select
            value={selectedGift || ''}
            onChange={(e) => setSelectedGift(Number(e.target.value))}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#755955]"
          >
            <option value="">Selecione um presente</option>
            {gifts.filter(gift => !gift.assignedTo).map(gift => (
              <option key={gift.id} value={gift.id}>{gift.name}</option>
            ))}
          </select>
          <Button onClick={handleAssign} disabled={!selectedGift || name.trim() === ''}>
            Atribuir
          </Button>
        </div>
      </div>
      <ul className="space-y-2">
        {gifts.map(gift => (
          <li key={gift.id} className="flex items-center justify-between p-2 bg-white rounded-md shadow">
            <span className="flex items-center">
              <GiftIcon className="mr-2 text-[#755955]" size={20} />
              {gift.name}
            </span>
            {gift.assignedTo ? (
              <span className="text-sm text-gray-600">Escolhido por: {gift.assignedTo}</span>
            ) : (
              <span className="text-sm text-green-600">Disponível</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
