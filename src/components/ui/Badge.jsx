function Badge({ variant = 'default', className = '', ...props }) {
  return (
    <span
      className={`ui-badge ui-badge--${variant} ${className}`.trim()}
      {...props}
    />
  )
}

export default Badge
