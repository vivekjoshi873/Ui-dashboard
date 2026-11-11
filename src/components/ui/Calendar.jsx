import { useEffect, useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function parseDate(value) {
  if (!value) {
    return null
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null
}

function toDateValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDateLabel(value) {
  const date = parseDate(value)
  if (!date) {
    return 'dd-mm-yyyy'
  }

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}-${month}-${date.getFullYear()}`
}

function Calendar({ value, onChange, onErrorClear, hasError, errorId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const selectedDate = parseDate(value)
    const initialDate = selectedDate || new Date()
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  })
  const containerRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const selectedDate = parseDate(value)
    if (selectedDate) {
      setVisibleMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))
    }
  }, [value])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const selectedDate = parseDate(value)
  const todayValue = toDateValue(new Date())
  const monthLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(visibleMonth)
  const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1)
  const gridStart = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - firstDay.getDay())
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index)
    return {
      date,
      value: toDateValue(date),
      inMonth: date.getMonth() === visibleMonth.getMonth(),
    }
  })

  const chooseDate = (dateValue) => {
    onChange(dateValue)
    onErrorClear()
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div className="calendar-picker" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        className="calendar-trigger"
        aria-label={value ? `Due date, ${formatDateLabel(value)}` : 'Choose due date'}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={value ? '' : 'calendar-trigger__placeholder'}>
          {formatDateLabel(value)}
        </span>
        <CalendarDays size={16} aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="calendar-popover" role="dialog" aria-label="Choose due date">
          <div className="calendar-popover__header">
            <strong>{monthLabel}</strong>
            <div className="calendar-popover__month-actions">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1))}
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + 1, 1))}
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          <div className="calendar-grid" role="group" aria-label={`${monthLabel} calendar`}>
            {WEEKDAYS.map((weekday) => (
              <span className="calendar-grid__weekday" aria-hidden="true" key={weekday}>
                {weekday}
              </span>
            ))}
            {calendarDays.map(({ date, value: dateValue, inMonth }) => {
              const isSelected = dateValue === value
              const isToday = dateValue === todayValue
              const className = [
                'calendar-grid__day',
                !inMonth && 'calendar-grid__day--outside',
                isToday && 'calendar-grid__day--today',
                isSelected && 'calendar-grid__day--selected',
              ].filter(Boolean).join(' ')

              return (
                <button
                  type="button"
                  key={dateValue}
                  className={className}
                  aria-label={date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  aria-pressed={isSelected}
                  onClick={() => chooseDate(dateValue)}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>

          <div className="calendar-popover__footer">
            <button type="button" onClick={() => chooseDate('')}>Clear</button>
            <button type="button" onClick={() => chooseDate(todayValue)}>Today</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Calendar
