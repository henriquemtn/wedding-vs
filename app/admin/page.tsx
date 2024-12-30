import { GiftList } from '@/components/admin/gift-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Lista de Presentes',
  description: 'Administração da lista de presentes de casamento',
}

export default function AdminPage() {
    return (
    <div className="container mx-auto py-10 px-4">
      <GiftList />
    </div>
  )
}

