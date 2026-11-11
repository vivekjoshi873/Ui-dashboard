import * as DialogPrimitive from '@radix-ui/react-dialog'

export const Dialog = DialogPrimitive.Root

export function DialogContent({ className = '', children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="ui-dialog-overlay" />
      <DialogPrimitive.Content
        className={`ui-dialog-content ${className}`.trim()}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function DialogTitle({ className = '', ...props }) {
  return <DialogPrimitive.Title className={`ui-dialog-title ${className}`.trim()} {...props} />
}

export function DialogDescription({ className = '', ...props }) {
  return (
    <DialogPrimitive.Description
      className={`ui-dialog-description ${className}`.trim()}
      {...props}
    />
  )
}

export const DialogClose = DialogPrimitive.Close
