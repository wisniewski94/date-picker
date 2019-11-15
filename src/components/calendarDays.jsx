import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import calendar, { findDay, isSameMonth, isSameDay } from '../utils/dateParser'
import '../styles/calendarDays.sass'

class CalendarDays extends PureComponent {
	constructor(props) {
		super(props)
		const { month, year } = this.props
		this.state = { cal: calendar(month, year) }
	}

	componentDidUpdate(prevProps) {
		const { month } = this.props
		const calDates = this.getCalendarDates()
		if (prevProps.month !== month) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ cal: calDates })
		}
	}

	getCalendarDates = () => {
		const { month, year } = this.props
		return calendar(month, year)
	}

	renderCalendarGrid() {
		const { cal } = this.state
		if (cal === undefined) return
		const rows = []
		let iterator = 0
		for (let i = 0; i < 6; i += 1) {
			const items = []
			for (let x = 0; x < 7; x += 1) {
				items.push(this.renderDay(cal[iterator]))
				iterator += 1
			}
			rows.push(<tr key={`row${iterator}`}>{items}</tr>)
		}
		// eslint-disable-next-line consistent-return
		return rows
	}

	renderDay(date) {
		// avoiding anonymous functions
		const handleCurrentChange = () => {
			const { handleCurrent } = this.props
			handleCurrent(date)
		}
		if (date !== undefined) {
			const { current, month, year, today, available, second } = this.props
			const dateVal = new Date(date.join('-'))
			const isAvailable = findDay(available, dateVal)
			const isToday = isSameDay(dateVal, today)
			const isSecond = isSameDay(dateVal, second)
			const isCurrent = isSameDay(dateVal, current)
			const inMonth = isSameMonth(dateVal, new Date([year, month, 1].join('-')))
			let className = ''
			if (isCurrent) {
				className = 'current'
			} else if (isSecond) {
				className = 'second'
			} else if (isAvailable) {
				className = 'available'
			} else if (inMonth) {
				className = 'day'
			}
			if (!inMonth) {
				className += ' outMonth'
			}
			if (isToday) {
				className += ' today'
			}

			return (
				<button
					tabIndex={0}
					type="button"
					onClick={handleCurrentChange}
					onKeyPress={() => {}}
					className={className}
					date={date}
					key={date[2] + date[1]}
				>
					<td>
						{date[2]}
					</td>
				</button>
			)
		}
		return true
	}

	render() {
		return <>{this.renderCalendarGrid()}</>
	}
}

CalendarDays.defaultProps = {
	available: [],
	current: null,
	handleCurrent: null,
	month: null,
	second: null,
	today: null,
	year: null,
}

CalendarDays.propTypes = {
	available: PropTypes.arrayOf(PropTypes.any),
	current: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
	handleCurrent: PropTypes.func,
	month: PropTypes.number,
	second: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
	today: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
	year: PropTypes.number,
}

export default CalendarDays
