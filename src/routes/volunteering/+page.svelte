<script>
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let visible = $state(false);
	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 500);
	});
</script>

<div class="flex flex-col items-center w-full gap-8 lg:gap-16">
	<div class="flex flex-col w-full lg:max-w-[80%] items-center gap-8 lg:gap-16 text-center">
		<h1>{m.volunteering()}</h1>
		<div class="flex min-h-[60vh] h-full w-full">
			{#if visible}
				<div
					class="flex flex-col self-center h-full gap-4 lg:gap-8 text-center relative"
					in:fade={{ duration: 600 }}
				>
					<p>
						You can travel all around the world while meeting amazing people, learning tons of
						things and save a lot of money.
					</p>
					<p>Volunteering basically consists in a mututal exchange. You work some</p>
					<p>
						For me it was one of the best decisions I ever made. Volunteering allowed me to travel
						around many countries and meet amazing people. I learned many new skills and even more
						things about myself and life itself. I once heard that travelling is the school of
						life.. and I've been proof of that. I strongly believe volunteering is the best way to
						travel. Either your do it alone or with a partner.
					</p>
					<h2>Befenits</h2>
					<p>
						As everything in life, volunteering might not be siutable for anyone. It takes a lot of
						courage to move around different places where you don't know what or who is awaiting
						you. There is a high level of uncertainty, which constantly tests you and your
						willpower. That's exactly the reason why, if you think it wouldn't suit you, I would
						recommend it even more. You save A LOT of money. Most of the volunteering opportunities
						offer you accommodation and food, which are the two most expensive things while
						travelling.
					</p>
				</div>
			{/if}
		</div>
		<h2>My experiences</h2>
		<ul class="flex flex-col gap-2 lg:gap-4 items-center">
			<li>🇪🇨 Cuenca, Cosmos Apparel</li>
			<li>🇪🇨 Malacatos, Serena Holistic Center</li>
			<li>🇵🇪 Tarapoto, Sumaj Hoteles</li>
			<li>🇵🇪 Urubamba, Chaqra</li>
			<li>🇨🇱 Melipilla, Casa Conciencia</li>
			<li>🇨🇱 Catemu, Ekachacra</li>
			<li>🇧🇴 La Paz, Lobo Hostel</li>
			<li>🇧🇴 Oruro, Backpackers Oruro</li>
			<li>🇧🇴 Santa Cruz, Ser Fauna</li>
			<li>🇧🇴 Samaipata, Finca de Andrés</li>
			<li>🇧🇴 Coimata, La Poza del Pato</li>
			<li>🇧🇴 Tarija, Hostel Cultural Pata y Perro</li>
		</ul>
	</div>
	<button
		class="btn btn-primary"
		on:click={() =>
			window.open(
				'https://www.worldpackers.com/es/promo/JUANMA12?utm_campaign=JUANMA12&utm_medium=referral&utm_source=affiliate'
			)}>🌍 {m.worldpackers_button()}</button
	>
	<iframe
		title="Mapa de viajes"
		src="https://www.google.com/maps/d/u/0/embed?mid=1ozw02Cg_HeQQFyzpOs99K48bPLn9wBA&ehbc=2E312F"
		class="w-full lg:w-1/2 h-96"
	></iframe>
</div>
