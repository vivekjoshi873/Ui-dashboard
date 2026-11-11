import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

export const AlertDialog = AlertDialogPrimitive.Root

export function AlertDialogContent({ className = '', children, ...props }) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="ui-dialog-overlay" />
      <AlertDialogPrimitive.Content
        className={`ui-alert-content ${className}`.trim()}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  )
}

export function AlertDialogTitle({ className = '', ...props }) {
  return (
    <AlertDialogPrimitive.Title
      className={`ui-dialog-title ${className}`.trim()}
      {...props}
    />
  )
}

export function AlertDialogDescription({ className = '', ...props }) {
  return (
    <AlertDialogPrimitive.Description
      className={`ui-dialog-description ${className}`.trim()}
      {...props}
    />
  )
}

export const AlertDialogCancel = AlertDialogPrimitive.Cancel
export const AlertDialogAction = AlertDialogPrimitive.Action
