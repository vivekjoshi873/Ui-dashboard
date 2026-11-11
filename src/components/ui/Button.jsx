function Button({ variant = 'primary', size = 'default', className = '', ...props }) {
  return (
    <button
      className={`ui-button ui-button--${variant} ui-button--${size} ${className}`.trim()}
      {...props}
    />
  )
}

export default Button
