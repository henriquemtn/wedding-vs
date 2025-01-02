'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EditIcon, GiftIcon, PlusIcon, Trash2Icon, UserIcon, UserRoundPenIcon } from 'lucide-react'
import { AddEditGiftDialog } from './add-edit-gift'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { UserButton, useUser } from '@clerk/nextjs'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

type Gift = {
  id: string
  name: string
  gifted_by: string
}

export function GiftList() {
  const { user } = useUser()
  const [gifts, setGifts] = useState<Gift[]>([])
  const [filteredGifts, setFilteredGifts] = useState<Gift[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    fetchGifts()
  }, [])

  const fetchGifts = async () => {
    const giftsCollection = collection(db, 'gifts')
    const giftSnapshot = await getDocs(giftsCollection)
    const giftList = giftSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Gift))
    setGifts(giftList)
    setFilteredGifts(giftList)
  }
  const [giftToEdit, setGiftToEdit] = useState<Gift | null>(null);

  const handleEditGift = (gift: Gift) => {
    setGiftToEdit(gift);
    setIsAddDialogOpen(true);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    const filtered = gifts.filter(gift =>
      gift.name.toLowerCase().includes(value) ||
      gift.gifted_by.toString().includes(value)
    )
    setFilteredGifts(filtered)
  }

  const handleAddGift = async (newGift: Omit<Gift, 'id'>) => {
    const giftsCollection = collection(db, 'gifts')
    const docRef = await addDoc(giftsCollection, newGift)
    const giftWithId = { ...newGift, id: docRef.id }
    setGifts(prev => [...prev, giftWithId])
    setFilteredGifts(prev => [...prev, giftWithId])
    setIsAddDialogOpen(false)
  }

  const handleDeleteGift = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este presente?')) {
      const giftRef = doc(db, 'gifts', id)
      await deleteDoc(giftRef)
      setGifts(prev => prev.filter(gift => gift.id !== id))
      setFilteredGifts(prev => prev.filter(gift => gift.id !== id))
    }
  }

  const handleSubmitGift = async (updatedGift: Omit<Gift, 'id'>, id?: string) => {
    if (id) {
      // Atualizar presente existente
      const giftRef = doc(db, 'gifts', id);
      await updateDoc(giftRef, updatedGift);
      setGifts(prev => prev.map(gift => gift.id === id ? { id, ...updatedGift } : gift));
      setFilteredGifts(prev => prev.map(gift => gift.id === id ? { id, ...updatedGift } : gift));
    } else {
      // Adicionar novo presente (código existente)
      await handleAddGift(updatedGift);
    }
    setGiftToEdit(null);
  };


  return (
    <div className='bg-white border rounded-md p-6'>
      <div className='flex flex-row items-center gap-4 mb-8'>
        <UserButton />
        <span className="text-xl">Olá, <span className='capitalize'>{user?.username}</span>👋</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center mb-4">
        <Input
          placeholder="Filtrar presentes..."
          onChange={handleFilter}
          className="md:max-w-sm"
        />
        <div className='flex flex-row gap-2 md:gap-8'>
          <div className='flex text-sm items-center'>
            <GiftIcon className="mr-2 h-4 w-4" />
            Presentes:
            <span className="ml-2 text-gray-500">
              {filteredGifts.length}
            </span>
          </div>
          <div className='flex text-sm items-center'>
            <UserRoundPenIcon className="mr-2 h-4 w-4" />
            Preenchido por:
            <span className="ml-2 text-gray-500">
              {filteredGifts.filter(gift => gift.gifted_by).length}
            </span>
          </div>
        </div>
        <Button className='w-full md:w-auto' onClick={() => setIsAddDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Presente
        </Button>
      </div>
      <div className="w-full overflow-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-44'>
                <div className='flex items-center gap-2'>
                  <GiftIcon className='size-4' />
                  Presente
                </div>
              </TableHead>
              <TableHead>
                <div className='flex items-center gap-2'>
                  <UserIcon className='size-4' />
                  Nome
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGifts.map((gift) => (
              <TableRow key={gift.id}>
                <TableCell className='min-w-44'>{gift.name}</TableCell>
                <TableCell className='min-w-44'>{gift.gifted_by}</TableCell>
                <TableCell className='flex gap-2 justify-end'>
                  <Button variant="secondary" size="sm" onClick={() => handleEditGift(gift)}>
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteGift(gift.id)}>
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddEditGiftDialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          setGiftToEdit(null);
        }}
        onSubmit={handleSubmitGift}
        giftToEdit={giftToEdit}
      />
    </div>
  )
}

