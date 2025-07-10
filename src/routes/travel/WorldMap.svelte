<script lang="ts">
	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import * as d3 from 'd3';
	import world from '../../countries/countries-map.json';
	import type { Country } from '@prisma/client';

	const {
		onSelectCountry,
		visitedCountries,
		smallDevice
	}: {
		onSelectCountry: (country: { name: string; code: string; flag: string } | null) => void;
		visitedCountries: Country[];
		smallDevice: boolean;
	} = $props();

	const width = 950;
	const height = 500;

	const projection = d3.geoMercator().scale(140).translate([480, 340]);
	const path = d3.geoPath().projection(projection);

	let svg: any;
	let g: any;
	let countries: any;
	let mesh: any;
	let selected = $state<string | null>(null);
	let features = $state<any[]>([]);

	// Initialize zoom behavior
	const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', zoomed);

	const visitedCountryNames = new Set(
		visitedCountries
			.filter((country: Country) => country.visited)
			.map((country: Country) => country.name)
	);

	onMount(async () => {
		try {
			svg = d3
				.select('.map-container')
				.append('svg')
				.attr('viewBox', [0, 0, width, height])
				.attr('width', '100%')
				.attr('height', '100%')
				.style('border', '2px solid var(--b1)')
				.attr('preserveAspectRatio', 'xMidYMid meet')
				.on('click', zoomSA)
				.call(zoom);

			g = svg.append('g');

			// Initialize countries and mesh after fetching the world data
			features = topojson.feature(world, world.objects.countries).features;

			// Filter out Antarctica and Greenland
			features = features.filter(
				(feature: any) =>
					feature.properties.name !== 'Antarctica' && feature.properties.name !== 'Greenland'
			);

			if (features) {
				countries = g
					.append('g')
					.attr('stroke', 'var(--color-base-content)')
					.selectAll('path')
					.data(features)
					.join('path')
					.attr('d', path)
					.style('transition', 'all .4s ease')
					.attr('cursor', (d: any) =>
						visitedCountryNames.has(d.properties.name) ? 'pointer' : 'normal'
					)
					.attr('fill', (d: any) =>
						visitedCountryNames.has(d.properties.name) ? 'var(--color-base-300)' : 'transparent'
					)
					.on('click', (event: MouseEvent, d: any) => {
						if (visitedCountryNames.has(d.properties.name)) {
							selected = d.properties.name;
							clicked(event, d);
						}
					})
					.on('mouseover', (event: MouseEvent, d: any) => {
						if (visitedCountryNames.has(d.properties.name) && selected !== d.properties.name) {
							d3.select(event.currentTarget).style('fill', 'var(--color-primary)');
						}
					})
					.on('mouseout', (event: MouseEvent, d: any) => {
						if (visitedCountryNames.has(d.properties.name) && selected !== d.properties.name) {
							d3.select(event.currentTarget).style('fill', 'var(--color-base-300)');
						}
					});
				mesh = topojson.mesh(world, countries, (a: any, b: any) => a !== b);

				zoomSA();
			}
		} catch (error) {
			console.error('Error fetching world data:', error);
		}
	});

	function clicked(event: MouseEvent, d: any) {
		event.stopPropagation();
		onSelectCountry(d.properties);
		const [[x0, y0], [x1, y1]] = path.bounds(d);
		countries.transition().style('fill', null);
		d3.select(event.currentTarget).transition().style('fill', 'var(--color-primary)');
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
		countries.transition().style('fill', null);
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
		selected = null;
		onSelectCountry(null);
	}
</script>

<div class="map-container relative h-[70vh] w-full lg:h-[65vh]">
	<button
		class="btn btn-circle btn-ghost absolute bottom-2 left-1/2 text-xl opacity-50 transition-opacity hover:opacity-100"
		onclick={() => reset}>🌎</button
	>
	<div
		class="pointer-events-none absolute left-0 top-0 h-full w-full shadow-[var(--b1)_inset]"
	></div>
	<!-- SVG will be appended here by D3.js -->
</div>
