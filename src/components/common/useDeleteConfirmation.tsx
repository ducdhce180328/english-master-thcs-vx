import React, { useEffect, useRef, useState } from 'react';

export function useDeleteConfirmation() {
  const [message, setMessage] = useState('');
  const resolver = useRef<((confirmed: boolean) => void) | null>(null);
  const settle = (confirmed: boolean) => {
    resolver.current?.(confirmed);
    resolver.current = null;
    setMessage('');
  };
  useEffect(() => () => resolver.current?.(false), []);
  const confirmDelete = (text: string) => new Promise<boolean>((resolve) => {
    resolver.current?.(false);
    resolver.current = resolve;
    setMessage(text);
  });
  const confirmationDialog = message ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4" onKeyDown={(event) => {
      if (event.key === 'Escape') settle(false);
    }}>
      <div role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-message" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 id="delete-title" className="text-lg font-bold text-slate-900">Xác nhận xóa</h2>
        <p id="delete-message" className="mt-3 text-sm text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button autoFocus onClick={() => settle(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm">Hủy</button>
          <button onClick={() => settle(true)} className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">Xóa</button>
        </div>
      </div>
    </div>
  ) : null;
  return { confirmDelete, confirmationDialog };
}
