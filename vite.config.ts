import { defineConfig } from "vitest/config";
import dns from "dns";
import react from "@vitejs/plugin-react-swc";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
	base: "/project-planner/",
	plugins: [react()],
	server: {
		host: "localhost",
		port: 3000,
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
		css: true,
		reporters: ["verbose"],
		coverage: {
			reporter: ["text", "json", "html"],
			include: ["src/**/*"],
			exclude: [],
		},
	},
});
