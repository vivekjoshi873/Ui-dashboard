import Button from './ui/Button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from './ui/AlertDialog'

function ConfirmDialog({ taskTitle, isOpen, onCancel, onConfirm }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className="confirm-dialog">
        <AlertDialogTitle>Delete task?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete <strong>{taskTitle}</strong>? This action cannot be undone.
        </AlertDialogDescription>

        <div className="confirm-dialog__actions">
          <AlertDialogCancel asChild>
            <Button type="button" variant="secondary">
            Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type="button" variant="danger" onClick={onConfirm}>
            Delete task
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDialog
