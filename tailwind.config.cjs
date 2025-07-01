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
	plugins: [tailwindTypography, daisyui, import('@tailwindcss/container-queries')],
	daisyui: {
		themes: [
			{
				eco: {
					primary: '#14532D',
					secondary: '#4D7C0F',
					accent: '#65A30D',
					neutral: '#374151',
					'base-100': '#F0FDF4',
					'base-content': '#1B1C1B',
					info: '#3B82F6',
					success: '#15803D',
					warning: '#F59E0B',
					error: '#DC2626'
				},
				dark: {
					primary: '#65A30D',
					secondary: '#4D7C0F',
					accent: '#A3E635',
					neutral: '#1F2937',
					'base-100': '#0F172A',
					'base-content': '#F0FDF4',
					info: '#3B82F6',
					success: '#22C55E',
					warning: '#EAB308',
					error: '#EF4444'
				}
			}
		]
	}
};
