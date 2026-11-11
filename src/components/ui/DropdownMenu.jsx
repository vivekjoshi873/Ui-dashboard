import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

export const DropdownMenu = DropdownMenuPrimitive.Root

export function DropdownMenuTrigger({ ...props }) {
  return <DropdownMenuPrimitive.Trigger {...props} />
}

export function DropdownMenuContent({ className = '', ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={`ui-menu-content ${className}`.trim()}
        sideOffset={6}
        align="end"
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuItem({ className = '', ...props }) {
  return <DropdownMenuPrimitive.Item className={`ui-menu-item ${className}`.trim()} {...props} />
}
