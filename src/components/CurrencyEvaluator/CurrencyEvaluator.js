import React, { useState, useEffect } from 'react';
import './CurrencyEvaluator.css';
import { makeStyles } from '@material-ui/core/styles';
import TimelinePortion from '../TimelinePortion/TimelinePortion';
import ClientMenu from '../ClientMenu/ClientMenu';

const useStyles = makeStyles({
	root: {
		backgroundImage: 'linear-gradient(#3A5185,  #38517E)',
		height: '100%',
		width: '100%',
		minHeight: '100vh',
		paddingTop: '100px',
		paddingLeft: '24px',
		paddingRight: '24px',
	},
	title: {
		fontSize: '2.625rem',
		fontFamily: 'Averta,Avenir W02,Avenir,Helvetica,Arial,sans-serif;',
		color: '#fff',
		maxWidth: '480px',
		marginBottom: '44px',
		marginLeft: 'auto',
		marginRight: 'auto',
		fontWeight: '800',
	},
	subTitle: {
		fontFamily: 'Averta,Avenir W02,Avenir,Helvetica,Arial,sans-serif;',
		fontSize: '1rem',
		color: '#f2f5f7',
		maxWidth: '400px',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: '24px',
	},
	clientSendInput: {
		backgroundColor: 'white',
		maxHeight: '72px',
		minWidth: '308px',
		padding: '28px 12px 4px',
		fontSize: '22px',
		lineHeight: '32px',
	},
	clientContribution: {
		display: 'flex',
		justifyContent: 'center',
	},
	timelinePortion: {
		maxWidth: '530px',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	tableCell: {
		display: 'flex',
	},
	clientSendLabel: {
		fontSize: '.875rem',
		color: '#5d7079',
		paddingTop: '12px',
		paddingLeft: '12px',
		position: 'absolute',
	},
	errorMessage: {
		color: '#FFF',
		marginBottom: '20px',
	},
});

const CurrencyEvaluator = () => {
	const classes = useStyles();
	const [clientSend, setClientSend] = useState(0);
	const [conversionStandardClient, setConversionStandardClient] = useState(
		'EUR',
	);
	const [
		conversionStandardRecipient,
		setConversionStandardRecipient,
	] = useState('JPY');
	const [isRecConversionMenuOpen, setIsRecConversionMenuOpen] = useState();
	const [amountToConvert, setAmountToConvert] = useState();
	const [guaranteedRate, setGuaranteedRate] = useState();
	const [recipientReceives, setRecipientReceives] = useState(
		amountToConvert * guaranteedRate,
	);
	const [rates, setRates] = useState({});

	const [
		isConversionClientMenuOpen,
		setIsConversionClientMenuOpen,
	] = useState(false);

	const onChangeClientSend = e => {
		setClientSend(e);
		setAmountToConvert(e - (e * 0.0116 + e * 0.0123).toFixed(2));
	};

	useEffect(() => {
		setRecipientReceives(amountToConvert * guaranteedRate);
	}, [clientSend]);

	useEffect(() => {
		setRecipientReceives(amountToConvert * guaranteedRate);
	}, [guaranteedRate]);

	const onChangeRecipientReceives = e => {
		if (guaranteedRate) {
			setClientSend(amountToConvert / guaranteedRate);
		}
	};

	const fetchRate = () => {
		fetch('https://api.exchangeratesapi.io/latest')
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setRates(data.rates);
			});
	};

	useEffect(() => {
		fetchRate();
	}, []);

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				The cheap, fast way to send money abroad.
			</div>
			<div className={classes.subTitle}>
				Join over 10 million people who get the real exchange rate with
				Wise. We’re on average 8x cheaper than leading UK high street
				banks.
			</div>
			<div className={classes.clientContribution}>
				<div className={classes.tableCell}>
					<ClientMenu
						conversionStandard={conversionStandardClient}
						setConversionStandard={setConversionStandardClient}
						isConversionMenuOpen={isConversionClientMenuOpen}
						setIsConversionMenuOpen={setIsConversionClientMenuOpen}
					/>
				</div>
				<div className={classes.tableCell}>
					<label className={classes.clientSendLabel}>You send</label>
					<input
						type='number'
						onChange={e => onChangeClientSend(e.target.value)}
						value={clientSend}
						className={classes.clientSendInput}
					/>
				</div>
			</div>
			<div className={classes.timelinePortion}>
				<TimelinePortion
					conversionStandardRecipient={conversionStandardRecipient}
					conversionStandardClient={conversionStandardClient}
					amountToConvert={amountToConvert}
					guaranteedRate={guaranteedRate}
					setGuaranteedRate={setGuaranteedRate}
					rates={rates}
					setAmountToConvert={setAmountToConvert}
					clientSend={clientSend}
				/>
			</div>
			<div className={classes.clientContribution}>
				<ClientMenu
					conversionStandard={conversionStandardRecipient}
					setConversionStandard={setConversionStandardRecipient}
					isConversionMenuOpen={isRecConversionMenuOpen}
					setIsConversionMenuOpen={setIsRecConversionMenuOpen}
				/>
				<div className={classes.tableCell}>
					<label className={classes.clientSendLabel}>
						Recipient gets
					</label>
					<input
						type='number'
						value={recipientReceives}
						onChange={e =>
							onChangeRecipientReceives(e.target.value)
						}
						className={classes.clientSendInput}
					/>
				</div>
			</div>
		</div>
	);
};

export default CurrencyEvaluator;
