import React from 'react';
import "../style/common/tile.css";

const TinyTile=(props: {value: string, image: any, width: string; margin?: string; onClick: any} )=>
{
	const generateDimensionStyle = () => {
		return {
			width: props.width,
			height: props.width,
			margin: props.margin,
			border: '1px solid #BBBBBB'
		}
	}
 return (
	<>
	<div className="tile-container d-flex flex-column align-items-center justify-content-center" style={generateDimensionStyle()} onClick={props.onClick} id={props.value}>
		<img src={props.image} alt="value"/>
		<h6 className="text-center">{props.value}</h6>
	</div>
	</>
 );
}

TinyTile.defaultProps =  {margin: 0}
export default TinyTile;