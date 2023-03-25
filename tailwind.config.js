/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
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
		},
	},
	plugins: [],
};

// bg-[#febb8a]
