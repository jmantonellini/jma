<script>
	import { m } from '$lib/paraglide/messages';
</script>

<div class="flex flex-col items-center lg:max-w-4xl mx-auto">
	<section class="flex flex-col items-center mb-6 lg:mb-10">
		<h1 class="self-center">{m.volunteering_title()}</h1>
		<div class="lg:columns-2 lg:gap-8 h-full text-justify">
			{@html m.volunteering_intro()}
		</div>
	</section>
	<section class="flex flex-col items-center mb-6 lg:mb-10">
		<h2>{m.benefits()}</h2>
		<div class="lg:columns-2 lg:gap-8 h-full text-justify">
			{@html m.volunteering_benefits()}
		</div>
	</section>
	<section class="flex flex-col items-center mb-6 lg:mb-10">
		<h2>{m.my_experiences()}</h2>
		<ul class="flex flex-col gap-2 lg:gap-4 items-center">
			<li>🇨🇴 Sandoná, Movie Time Cinema</li>
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
	</section>
	<button
		class="btn btn-lg btn-primary mt-6"
		onclick={() =>
			window.open(
				'https://www.worldpackers.com/es/promo/JUANMA12?utm_campaign=JUANMA12&utm_medium=referral&utm_source=affiliate'
			)}>{m.worldpackers_button()} 🌎</button
	>
</div>
<!-- <iframe
		title="Mapa de viajes"
		src="https://www.google.com/maps/d/u/0/embed?mid=1ozw02Cg_HeQQFyzpOs99K48bPLn9wBA&ehbc=2E312F"
		class="w-full lg:w-1/2 h-96"
	></iframe> -->
