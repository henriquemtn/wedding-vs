"use client"

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Gift = {
    id: string;
    name: string;
    gifted_by: string;
};

interface AddEditGiftDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (gift: Omit<Gift, "id">, id?: string) => void;
    giftToEdit?: Gift | null;
}

export function AddEditGiftDialog({
    isOpen,
    onClose,
    onSubmit,
    giftToEdit = null,
}: AddEditGiftDialogProps) {
    const [name, setName] = useState(giftToEdit?.name || "");
    const [giftedBy, setGiftedBy] = useState(giftToEdit?.gifted_by || "");

    useEffect(() => {
        if (giftToEdit) {
            setName(giftToEdit.name);
            setGiftedBy(giftToEdit.gifted_by);
        } else {
            setName("");
            setGiftedBy("");
        }
    }, [giftToEdit]);

    const handleSubmit = () => {
        if (!name) {
            alert("Por favor, preencha o nome do presente.");
            return;
        }
        onSubmit({ name, gifted_by: giftedBy }, giftToEdit?.id);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {giftToEdit ? "Editar Presente" : "Adicionar Presente"}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="Nome do Presente"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {giftToEdit && (
                        <Input
                            placeholder="Nome de quem presenteou"
                            value={giftedBy}
                            onChange={(e) => setGiftedBy(e.target.value)}
                        />
                    )}
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit}>
                        {giftToEdit ? "Salvar Alterações" : "Adicionar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
