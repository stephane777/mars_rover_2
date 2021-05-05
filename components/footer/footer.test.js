import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Footer } from "./footer.component";

describe("it should render the footer", () => {
	it("should render the footer", () => {
		const { container } = render(<Footer />);
		expect(container.firstChild.className).toMatch("footer_wrapper");
	});
	it("should show Created by ...", () => {
		render(<Footer />);
		expect(
			screen.getByText(/Created by Stephane Candelas./i)
		).toBeInTheDocument();
	});
	it("should contain a link", () => {
		render(<Footer />);
		expect(screen.queryByTestId("github-link")).toBeTruthy();
		expect(screen.queryByTestId("github-svg")).toBeTruthy();
	});
});

describe("SNAPSHOT", () => {
	it("should match the snapshot for Footer component", () => {
		const snapshot = render(<Footer />);
		expect(snapshot).toMatchSnapshot();
	});
});
