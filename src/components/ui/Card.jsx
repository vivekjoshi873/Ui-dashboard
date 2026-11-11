function Card({ className = '', ...props }) {
  return <article className={`ui-card ${className}`.trim()} {...props} />
}

export default Card
