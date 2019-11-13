import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CalendarHeader from './calendarHeader'
import CalendarLabel from './calendarLabel'
import CalendarDays from './calendarDays'
import '../styles/calendar.sass'

class Calendar extends Component {
	constructor(props) {
		super(props)

		const { date } = props

		this.state = {
			month: date.getMonth() + 1,
			year: date.getFullYear(),
			today: new Date(),
		}
	}

	handleDateChange = date => {
		this.setState(date)
	};

	render() {
		const { month, year, today } = this.state
		const { handleCurrentChange, current, available, second, className } = this.props
		return (
			<div className={`${className} date-picker`}>
				<CalendarHeader
					month={month}
					year={year}
					currentDate={this.handleDateChange}
				/>
				<table>
					<tbody>
						<CalendarLabel />
						<CalendarDays
							month={month}
							year={year}
							today={today}
							current={current}
							second={second}
							available={available}
							handleCurrent={handleCurrentChange}
						/>
					</tbody>
				</table>
			</div>
		)
	}
}

Calendar.defaultProps = {
	available: [],
	className: null,
	current: null,
	handleCurrentChange: null,
	second: null,
}

Calendar.propTypes = {
	available: PropTypes.arrayOf(PropTypes.any),
	className: PropTypes.string,
	current: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
	date: PropTypes.instanceOf(Date).isRequired,
	handleCurrentChange: PropTypes.func,
	second: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
}

export default Calendar
