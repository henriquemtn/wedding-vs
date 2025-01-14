'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { GiftIcon, CheckIcon, PlusCircle, InfoIcon } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { AddEditGiftDialog } from './admin/add-edit-gift';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Gift {
  id: string;
  name: string;
  gifted_by: string | null;
}

export const GiftRegistry: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    const giftsCollection = collection(db, 'gifts');
    const giftSnapshot = await getDocs(giftsCollection);
    const giftList = giftSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Gift));
    setGifts(giftList);
  };

  const handleGiftAction = async () => {
    if (!selectedGift || !userName.trim()) return;

    const giftRef = doc(db, 'gifts', selectedGift.id);

    if (selectedGift.gifted_by) {
      // Attempting to unclaim the gift
      if (userName.trim().toLowerCase() === selectedGift.gifted_by.toLowerCase()) {
        await updateDoc(giftRef, { gifted_by: null });
        setGifts(gifts.map(g => g.id === selectedGift.id ? { ...g, gifted_by: null } : g));
        setSelectedGift({ ...selectedGift, gifted_by: null });
      } else {
        setErrorMessage('O nome digitado não corresponde ao nome da pessoa que escolheu este presente.');
        return;
      }
    } else {
      // Claiming the gift
      await updateDoc(giftRef, { gifted_by: userName.trim() });
      setGifts(gifts.map(g => g.id === selectedGift.id ? { ...g, gifted_by: userName.trim() } : g));
      setSelectedGift({ ...selectedGift, gifted_by: userName.trim() });
    }

    setUserName('');
    setIsDialogOpen(false);
    setErrorMessage('');
  };

  const openGiftDialog = (gift: Gift) => {
    setSelectedGift(gift);
    setIsDialogOpen(true);
    setErrorMessage('');
  };

  const handleAddGift = async (newGift: Omit<Gift, 'id'>) => {
    const giftsCollection = collection(db, 'gifts')
    const docRef = await addDoc(giftsCollection, newGift)
    const giftWithId = { ...newGift, id: docRef.id }
    setGifts(prev => [...prev, giftWithId])
    setIsAddDialogOpen(false)
  }

  return (
    <div className="flex flex-col justify-start w-full">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
        <h3 className="text-[#755955] text-sm font-semibold tracking-wider">LISTA DE PRESENTES</h3>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#846e6b] hover:bg-[#755955] text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar outro presente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gifts.map(gift => (
          <Card
            key={gift.id}
            className={`cursor-pointer transition-all duration-300 ${gift.gifted_by ? 'opacity-50' : 'hover:shadow-lg'}`}
            onClick={() => openGiftDialog(gift)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <GiftIcon className="mr-3 text-[#846e6b]" size={24} />
                <span className="font-medium">{gift.name}</span>
              </div>
              {gift.gifted_by && (
                <CheckIcon className="text-green-500" size={20} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='flex flex-col text-center justify-center items-center mt-4 text-[#846e6b]'>
        <InfoIcon className='size-4 mr-2'/>
        <p className='text-sm  my-2'>Caso queira ajudar na compra da nossa futura casa, ficaremos felizes em receber sua contribuição em dinheiro ou pix: <span className='font-bold'>2d863c10-0c4b-4073-8ac6-d9af80eb52ac</span></p>
        <p className='text-sm'>Os presentes também podem ser enviados para nosso endereço: <span className='underline'>Travessa José Graciliano da Silva, 170, bloco B, apto 104</span></p>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedGift?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedGift?.gifted_by ? (
              <p className="text-sm text-gray-600">
                Este presente já foi selecionado. Para liberá-lo, digite o mesmo nome utilizado no momento da escolha ou entre em contato diretamente com os noivos.
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Este presente está disponível. Digite seu nome para escolhê-lo:
              </p>
            )}
            <Input
              type="text"
              placeholder="Digite seu nome"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
            <DialogFooter>
              <Button
                onClick={handleGiftAction}
                disabled={!userName.trim()}
              >
                {selectedGift?.gifted_by ? 'Liberar Presente' : 'Confirmar Escolha'}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      <AddEditGiftDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddGift}
        userAddingGift
      />
    </div>
  );
}

