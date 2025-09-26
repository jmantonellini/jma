<script>
	import { T, useTask } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { interactivity, TransformControls, useGltf } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	let rotation = $state(0);

	useTask((delta) => {
		rotation += delta;
	});

	interactivity();
	const scale = new Spring(1);

	const gltf = useGltf('/lambo/scene.gltf');
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>
<TransformControls position.y={1}>
	{#await gltf then { scene }}
		<T is={scene} />
	{/await}
</TransformControls>
