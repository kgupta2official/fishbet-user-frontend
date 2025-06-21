// components/ConfirmBuyPopupWrapper.js
import React from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import ConfirmBuyPage from './ConfirmBuyPage';

export default function ConfirmBuyPopupWrapper({ item }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-green-300 hover:bg-green-400 w-full m-3 text-black font-bold rounded-md py-2">
          ${item.amount}
        </button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-md mx-auto">
        <ConfirmBuyPage selectedPackage={item} />
      </DialogContent>
    </Dialog>
  );
}
