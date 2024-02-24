/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: 'class',
	theme: {
		fontFamily: {
			display: ['Open Sans', 'sans-serif'],
			body: ['Open Sans', 'sans-serif'],
		},
		screens: {
			'xxs': "360px",
			'xs': "410px",
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			boxShadow: {
				cartShadow: " 2px 2px 2px #765447",
				subsEmail: "0 0 10px #816d6d",
				subsButton: "0 0 25px #816d6d",
				chocolateShadow: "2px 2px 2px 2px rgb(164, 158, 158)",
				reviewShadow: "-12px -12px 32px 0px rgba(0, 0, 0, 0.25)"
			},
			fontFamily: {
				cookie: "Cookie",
				mont: "Montserrat",
				pacifico: "'Pacifico', cursive",
				pop: "'Poppins', sans-serif"
			},
			colors: {
				primary: "#8b5f4d",
			},
			background: {
				gradient:
					"linear-gradient(180deg, rgba(254, 107, 1, 0.46) 35.73%, rgba(247, 158, 27, 0.46) 100%)",
			},
			animation: {
				marquee: "marquee 40s linear infinite",
				marquee2: "marquee2 40s linear infinite",
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateY(0%)" },
					"100%": { transform: "translateY(-100%)" },
				},
				marquee2: {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(0%)" },
				},
			},
			fontSize: {
				14: '14px',
			},
			backgroundColor: {
				'main-bg': '#FAFBFB',
				'main-dark-bg': '#20232A',
				'secondary-dark-bg': '#33373E',
				'light-gray': '#F7F7F7',
				'half-transparent': 'rgba(0, 0, 0, 0.5)',
			},
			borderWidth: {
				1: '1px',
			},
			borderColor: {
				color: 'rgba(0, 0, 0, 0.1)',
			},
			width: {
				400: '400px',
				760: '760px',
				780: '780px',
				800: '800px',
				1000: '1000px',
				1200: '1200px',
				1400: '1400px',
			},
			height: {
				80: '80px',
			},
			minHeight: {
				590: '590px',
			},
			backgroundImage: {
				'hero-pattern':
					"url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
					
			},
		},
	},
	plugins: [],
};

// bg-[#febb8a]
