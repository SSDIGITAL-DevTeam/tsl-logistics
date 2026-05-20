import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  isPending?: boolean;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Delete',
  isPending = false,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed pt-1.5">{message}</p>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            loading={isPending}
            className="!bg-red-600 hover:!bg-red-700 focus:!ring-red-500"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
