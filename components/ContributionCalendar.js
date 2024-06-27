import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const ContributionCalendar = ({ calendar }) => {
	const [localCalendar, setLocalCalendar] = useState({});

	useEffect(() => {
		/* 
    make calendar 365 days, 1 year ago until now
    todo split into hook
    */
		const now = new Date();
		const oneYearAgo = new Date(now);
		const weekdayToStart = oneYearAgo.getDay() - 1;

		oneYearAgo.setFullYear(now.getFullYear() - 1);

		// create empty calendar with formatted date keys to compare with gitlab contributions
		while (oneYearAgo < now) {
			const formattedDate = oneYearAgo.toISOString().split('T')[0];

			localCalendar[formattedDate] = 0;
			oneYearAgo.setDate(oneYearAgo.getDate() + 1);
		}

		// overwrite calendar to add 0 contribution dates
		for (let dateKey in localCalendar) {
			if (calendar.hasOwnProperty(dateKey)) {
				localCalendar[dateKey] = calendar[dateKey];
			}
		}
		// Add x weekdays to pad flex container with empty days - invisible boxes
		const daysAdjustedForSundayStart = {};
		for (let i = 1; i < weekdayToStart; i++) {
			daysAdjustedForSundayStart[`paddedDay-${i}`] = `${weekdayToStart}-${i}`;
		}
		setLocalCalendar({ ...daysAdjustedForSundayStart, ...localCalendar });
	}, []);

	const getColor = (value) => {
		if (value === 'pad') {
			return 'transparent';
		}
		if (value === null || value === undefined || value === 0) {
			return '#eee';
		} else if (value > 0 && value <= 5) {
			return 'lightblue';
		} else if (value > 5 && value <= 10) {
			return 'rgba(135, 206, 250, 0.8)'; // 20% darker blue
		} else if (value > 10 && value <= 20) {
			return 'rgba(70, 130, 180, 0.8)'; // 20% darker
		} else if (value > 20) {
			return 'rgba(70, 130, 220, 1)'; // 20% darker
		}
	};

	return (
		calendar && (
			<StyledCalendar>
				{Object.values(localCalendar).map((value, index) => (
					<div
						key={index}
						className="calendarItem"
						style={{ backgroundColor: getColor(value) }}
					></div>
				))}
			</StyledCalendar>
		)
	);
};

export default ContributionCalendar;

const StyledCalendar = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	margin: 3rem auto;
	width: calc(52 * 17px);
	max-height: calc(7 * 17px);

	.calendarItem {
		border: 1px solid white;
		width: 17px;
		height: 17px;
		max-width: 17px;
		max-height: 17px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		position: relative;
	}
`;
