/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import tailwindTypography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			dropShadow: {
				glow: ['0 0px 20px rgba(255,255, 255, 0.35)', '0 0px 65px rgba(255, 255,255, 0.2)']
			},
			keyframes: {
				compass: {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'20%': { transform: 'rotate(60deg)' },
					'25%': { transform: 'rotate(50deg)' },
					'30%': { transform: 'rotate(65deg)' },
					'50%': { transform: 'rotate(-60deg)' },
					'75%': { transform: 'rotate(20deg)' }
				},
				'tick-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-180deg)' }
				},
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				},
				border: {
					to: { '--border-angle': '360deg' }
				},
				bounce: {
					'0%, 100%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
					},
					'50%': {
						transform: 'translateY(-25%)',
						animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
					}
				}
			},
			animation: {
				compass: 'compass 1s infinite ease-in-out',
				'tick-spin': 'tick-spin 1s cubic-bezier(0.36,0,0.66,-0.56)',
				text: 'text 5s ease infinite',
				border: 'border 4s linear infinite',
				bounce: 'bounce 0.5s ease-in-out infinite'
			},
			fontFamily: {
				jost: ['Jost', 'sans-serif']
			}
		}
	},
	plugins: [tailwindTypography, daisyui],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#522B47',
					secondary: '#8DAA9D',
					accent: '#BDD5EA',
					neutral: '#F7F7FF',
					'base-100': '#fbf5f3',
					info: '#fef08a',
					success: '#75FF75',
					warning: '#ea580c',
					error: '#FF8989'
				},
				sunset: {
					primary: '#cf5c36',
					'primary-content': '#eee5e9',
					secondary: '#A8C686',
					'base-100': '#333F47',
					accent: '#669BBC',
					neutral: '#F7F7FF',
					info: '#fef08a',
					success: '#75FF75',
					warning: '#ea580c',
					error: '#FF8989'
				}
			},
			'retro',
			'cyberpunk'
		]
	}
};
