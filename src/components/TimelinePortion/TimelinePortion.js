import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		margin: '20px 0px',
		fontSize: '14px',
	},
	textInTimeline: {
		color: '#d3d5d8',
		display: 'flex',
		justifyContent: 'center',
		padding: '10px 0px',
		fontFamily: 'Averta,Avenir W02,Avenir,Helvetica,Arial,sans-serif',
	},
	totalFeeText: {
		color: '#fff',
		fontFamily: 'Averta,Avenir W02,Avenir,Helvetica,Arial,sans-serif',
	},
	guaranteedRate: {
		color: '#00b9ff',
		fontFamily: 'Averta,Avenir W02,Avenir,Helvetica,Arial,sans-serif',
	},
	feeAmount: {
		flex: 1,
		fontFamily: 'Averta,Avenir W02,Avenir,Helvetica,Arial,sans-serif',
	},
	feeExplanation: {
		flex: 5,
		display: 'flex',
		justifyContent: 'left',
	},
});

const TimelinePortion = ({
	conversionStandardClient,
	conversionStandardRecipient,
	guaranteedRate,
	setGuaranteedRate,
	rates,
	clientSend,
}) => {
	const classes = useStyles();

	if (rates) {
		setGuaranteedRate(rates[conversionStandardRecipient]);
	}
	return (
		<div className={classes.root}>
			<div className={classes.textInTimeline}>
				<span>&#183;</span>
				<div className={classes.feeAmount}>
					{(clientSend * 0.0116).toFixed(2)} {conversionStandardClient}
				</div>
				<div className={classes.feeExplanation}>Dropdown fee</div>
			</div>
			<div className={classes.textInTimeline}>
				<span>&#183;</span>

				<div className={classes.feeAmount}>
					{(clientSend * 0.0123).toFixed(2)} {conversionStandardClient}
				</div>
				<div className={classes.feeExplanation}>Our fees</div>
			</div>
			<div className={classes.textInTimeline}>
				<span>&#183;</span>
				<div className={classes.feeAmount}>
					{(clientSend * 0.0116 + clientSend * 0.0123).toFixed(2)}{' '}
					{conversionStandardClient}
				</div>
				<div className={classes.feeExplanation}>Total fees</div>
			</div>
			<div className={classes.textInTimeline}>
				<span>&#183;</span>
				<div className={classes.feeAmount}>
					{clientSend -
						(clientSend * 0.0116 + clientSend * 0.0123).toFixed(
							2,
						)}{' '}
					{conversionStandardClient}
				</div>
				<div className={classes.feeExplanation}>
					Amount we'll convert
				</div>
			</div>
			{rates && (
				<div className={classes.textInTimeline}>
					<span>&#183;</span>
					<div className={classes.feeAmount}>
						<span className={classes.guaranteedRate}>
							{guaranteedRate}
						</span>
					</div>
					<div className={classes.feeExplanation}>
						Guaranteed Rate (80 hrs)
					</div>
				</div>
			)}
		</div>
	);
};

export default TimelinePortion;
