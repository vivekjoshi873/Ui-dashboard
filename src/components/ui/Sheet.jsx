import { Dialog, DialogContent } from './Dialog'

export function Sheet({ open, onOpenChange, children }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  )
}

export function SheetContent({ children, className = '', ...props }) {
  return (
    <DialogContent className={`ui-sheet-content ${className}`.trim()} {...props}>
      {children}
    </DialogContent>
  )
}
