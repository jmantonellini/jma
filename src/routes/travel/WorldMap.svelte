<script lang="ts">
import { onMount } from 'svelte';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import world from './countries-110m.json';
import type { Country } from '@prisma/client';

export let visitedCountries: Country[];
export let smallDevice: boolean;

const width = 950;
const height = 500;

const projection = d3.geoMercator().scale(140).translate([480, 340]);
const path = d3.geoPath().projection(projection);

let svg: any;
let g: any;
let countries: any;
let mesh: any;
let selected: any | null = null;

const primaryColor = '#FE5F55';
const secondaryColor = '#BDD5EA';

// Initialize zoom behavior
const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', zoomed);

const visitedCountryNames = new Set(
	visitedCountries.filter((country) => country.visited).map((country) => country.name)
);

onMount(async () => {
	try {
		svg = d3
			.select('.map-container')
			.append('svg')
			.attr('viewBox', [0, 0, width, height])
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('preserveAspectRatio', 'xMidYMid meet')
			.on('click', zoomSA)
			.call(zoom);

		g = svg.append('g');

		// Initialize countries and mesh after fetching the world data
		let features = topojson.feature(world, world.objects.countries).features;

		// Filter out Antarctica and Greenland
		features = features.filter(
			(feature: any) =>
				feature.properties.name !== 'Antarctica' && feature.properties.name !== 'Greenland'
		);

		if (features) {
			countries = g
				.append('g')
				.attr('stroke', '#577399')
				.attr('cursor', 'pointer')
				.selectAll('path')
				.data(features)
				.join('path')
				.attr('d', path)
				.style('transition', 'all .4s ease')
				.attr('fill', (d: any) =>
					visitedCountryNames.has(d.properties.name) ? secondaryColor : 'transparent'
				)
				.on('click', (event, d) => {
					if (visitedCountryNames.has(d.properties.name)) {
						clicked(event, d);
					}
				})
				.on('mouseover', (event, d) => {
					if (visitedCountryNames.has(d.properties.name)) {
						d3.select(event.currentTarget).style('fill', primaryColor);
						selected = d.properties.name;
					}
				})
				.on('mouseout', (event, d) => {
					if (visitedCountryNames.has(d.properties.name)) {
						d3.select(event.currentTarget).style('fill', secondaryColor);
						selected = null;
					}
				});
			mesh = topojson.mesh(world, countries, (a, b) => a !== b);

			zoomSA();
		}
	} catch (error) {
		console.error('Error fetching world data:', error);
	}
});

function clicked(event: MouseEvent, d: any) {
	const [[x0, y0], [x1, y1]] = path.bounds(d);
	event.stopPropagation();
	countries.transition().style('fill', null);
	d3.select(event.currentTarget).transition().style('fill', 'grey');
	svg
		.transition()
		.duration(750)
		.call(
			zoom.transform,
			d3.zoomIdentity
				.translate(width / 2, height / 2)
				.scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
				.translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
			d3.pointer(event, svg.node())
		);
}

function zoomed(event: any) {
	const { transform } = event;
	g.attr('transform', transform);
	g.attr('stroke-width', 1 / transform.k);
}

function zoomSA() {
	selected = null;
	const southAmericaCoords = [-300, -410]; // Longitude and Latitude for South America
	const initialScale = smallDevice ? 4 : 2.5;

	svg
		.transition()
		.duration(750)
		.call(
			zoom.transform,
			d3.zoomIdentity
				.translate(width / 2, height / 2)
				.scale(initialScale)
				.translate(southAmericaCoords[0], southAmericaCoords[1])
		);
}

function reset() {
	const southAmericaCoords = [-500, -300];
	const initialScale = 1;

	svg
		.transition()
		.duration(750)
		.call(
			zoom.transform,
			d3.zoomIdentity
				.translate(width / 2, height / 2)
				.scale(initialScale)
				.translate(southAmericaCoords[0], southAmericaCoords[1])
		);
}
</script>

<div class="map-container relative h-[80vh] w-full lg:h-[50vh]">
	<div class="absolute left-1/2 top-3 text-center">{selected ?? ''}</div>
	<button class="btn btn-sm absolute left-10 top-3" on:click={reset}>Reset Zoom</button>
	<!-- SVG will be appended here by D3.js -->
</div>
