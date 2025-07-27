import * as React from "react";

const mobileBreakpoint = 768;

export function useIsMobile(): boolean {
	const [isMobile, setIsMobile] = React.useState<boolean>(false);

	React.useEffect((): void => {
		const mediaQuery = globalThis.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);

		const onChange = (): void => {
			setIsMobile(globalThis.innerWidth < mobileBreakpoint);
		};

		mediaQuery.addEventListener("change", onChange);

		// Initial check
		setIsMobile(globalThis.innerWidth < mobileBreakpoint);

		return (): void => {
			mediaQuery.removeEventListener("change", onChange);
		};
	}, []);

	return Boolean(isMobile);
}
