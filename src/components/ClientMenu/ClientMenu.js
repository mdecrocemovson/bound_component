import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	simpleButton: {
		height: '70px',
		fontSize: '20px',
		color: '#FFF',
		width: '200px',
		backgroundColor: '#2e4369',
	},

	simpleMenu: {},
});

const COUNTRIES = [
	{ name: 'AUD', countryCode: 'us', currency: 'AUD' },
	{ name: 'JPY', countryCode: 'ru', currency: 'JPY' },
	{ name: 'EU', countryCode: 'eu', currency: 'EUR' },
	{ name: 'NOK', countryCode: 'nok', currency: 'NOK' },
];

const ClientMenu = ({
	conversionStandard,
	setConversionStandard,
	isConversionMenuOpen,
	setIsConversionMenuOpen,
}) => {
	const classes = useStyles();
	const handleClick = () => {
		setIsConversionMenuOpen(!isConversionMenuOpen);
	};

	const handleMenuItemClick = (event, index) => {
		setConversionStandard(event.currentTarget.innerText);
		setIsConversionMenuOpen(false);
	};
	return (
		<>
			<Button
				aria-controls='simple-menu'
				aria-haspopup='true'
				className={classes.simpleButton}
				onClick={handleClick}
			>
				{conversionStandard}
			</Button>
			<Menu
				className={classes.simpleMenu}
				id='simple-menu'
				anchorEl={conversionStandard}
				keepMounted
				open={isConversionMenuOpen}
				onClose={() => setIsConversionMenuOpen(false)}
			>
				{COUNTRIES.map(c => (
					<MenuItem onClick={event => handleMenuItemClick(event)}>
						{c.currency}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default ClientMenu;
