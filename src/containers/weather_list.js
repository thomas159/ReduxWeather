import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../components/chart";
import GoogleMap from '../components/google_map';

class WeatherList extends Component {

	// render single city
	renderWeather(cityData) {
		const temps = cityData.list.map(weather => weather.main.temp);
		const pressures = cityData.list.map(weather => weather.main.pressure);
		const humiditys = cityData.list.map(weather => weather.main.humidity);
		const { lon,lat } = cityData.city.coord;
		console.log(cityData.city.coord);


		return (
			<tr key={cityData.city.id}>
				<td><GoogleMap lon={lon} lat={lat} /></td>
				<td>
					<Chart data={temps} color="red" units="K" />
				</td>
				<td>
					<Chart data={pressures} color="orange" units="hPa" />
				</td>
				<td>
					<Chart data={humiditys} color="green" units="%" />
				</td>
			</tr>
		);
	}

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temp (K)</th>
						<th>Pressure (hPa)</th>
						<th>Humidty (%)</th>
					</tr>
				</thead>
					<tbody>
						{this.props.weather.map(this.renderWeather)}
					</tbody>
				</table>
		);
	}
}

function mapStateToProps({ weather }) {
	return { weather }; // { weather } === { weather: weather }
}

export default connect(mapStateToProps)(WeatherList);