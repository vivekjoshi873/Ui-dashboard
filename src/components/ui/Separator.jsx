function Separator({ className = '', ...props }) {
  return <div className={`ui-separator ${className}`.trim()} role="separator" {...props} />
}

export default Separator
