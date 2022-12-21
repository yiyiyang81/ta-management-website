import React from 'react';
import "../style/common/tile.css";

const Tile = (props: { value: string, image: any, width: string; margin?: string; onClick: any; color?: string }) => {
	const generateDimensionStyle = () => {
		return {
			width: props.width,
			height: props.width,
			margin: props.margin,
		}
	}
	return (
		<>
			<div className="tile-container d-flex flex-column align-items-center justify-content-center" style={generateDimensionStyle()} onClick={props.onClick} id={props.value}>
				<img src={props.image} alt="value" />
				<h5 style={{ color: props.color }}>{props.value}</h5>
			</div>
		</>
	);
}

Tile.defaultProps = { margin: 0, color: "black" }
export default Tile;