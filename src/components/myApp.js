import React from 'react'
export default function myApp(props) {
	return (
		<div>
			<Row>
			    <Column xs='12' sm='6' md='8'>
			    	md:8 - sm:6 - xs:12  
			    </Column>
			    <Column xs='6' md='4'>
			    	md: 4 - xs: 6
			    </Column>
			</Row>
		</div>
	);
}