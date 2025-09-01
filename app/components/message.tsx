import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

export default function Message({ open, onClose, title, message }: { open: boolean; onClose: () => void; title: string; message: string }) {
  if (!open) return null;

  return (
    <>
      <Dialog open={open} onClose={() => onClose()} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-70">
        <DialogPanel className="max-w-lg w-full space-y-4 rounded-lg border-2 border-[#785A28] bg-[#1E2328] p-12 shadow-xl">
        <DialogTitle className="font-bold text-[#C8AA6E] text-2xl">{title}</DialogTitle>
        <p className="text-[#A09B8C]">{message}</p>
        <div className="flex gap-4">
        </div>
        </DialogPanel>
      </div>
      </Dialog>
    </>
  );
}