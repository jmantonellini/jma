type RevealOptions = {
	threshold?: number;
	delay?: number;
};

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { threshold = 0.5, delay = 0 } = options;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
				setTimeout(() => {
					node.classList.add('opacity-100', 'translate-y-0');
				}, delay);
				observer.disconnect();
			}
		},
		{ threshold }
	);

	node.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
