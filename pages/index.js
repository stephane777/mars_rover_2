import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { DARK_YELLOW, RED, DARK_ORANGE } from "../constants/color";
import { grid_items, rovers_items, control_items } from "../constants/welcome";

const MarsRover = () => {
	return (
		<>
			<Head>
				<title>Welcom to Mars</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="welcome-wrapper">
				<h1>Welcome to Mars</h1>
				<div className="link-wrapper">
					<Link href="/mars-rover" className="link">
						<a>Control Panel</a>
					</Link>
				</div>
				<div className="content-wrapper">
					<div className="img-wrapper">
						<Image
							src="/images/overview.jpg"
							alt="Mission to mars overview"
							width={600}
							height={448}
						/>
					</div>
					<div className="description-wrapper">
						<h2 className="grid">Grid</h2>
						<ul>
							{grid_items.map((item, i) => (
								<li key={i}>{item.item}</li>
							))}
						</ul>
						<h2 className="rover">Rovers</h2>
						<ul>
							{rovers_items.map((item, i) => (
								<li key={i}>{item.item}</li>
							))}
						</ul>
						<h2 className="control">Control</h2>
						<ul>
							{control_items.map((item, i) => (
								<li key={i}>{item.item}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<style jsx>{`
				.grid,
				.rover,
				.control {
					font-size: 1.6rem;
					margin: 1rem 0;
					text-align: left;
				}
				ul {
					font-size: 1.2rem;
				}
				ul li {
					text-align: left;
					margin: 1rem 0;
				}
				.grid {
					color: ${DARK_YELLOW};
				}
				.rover {
					color: ${DARK_ORANGE};
				}
				.control {
					color: ${RED};
				}

				.welcome-wrapper {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 2rem;
					padding: 4rem 0;
					min-height: 80vh;
					text-align: center;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
				}
				.content-wrapper {
					width: 120rem;
					display: flex;
					flex-wrap: wrap;
				}
				.img-wrapper {
					border-radius: 5px;
					box-shadow: 12px 10px 12px #bbb;
					display: flex;
					justify-content: center;
					margin: 2rem 8rem;
					flex: 1;
				}
				.description-wrapper {
					flex: 1;
				}
				h1 {
					font-size: 3rem;
					font-family: Roboto, "sans-serif";
					letter-spacing: 0.2rem;
					margin: 2rem 0;
					text-transform: uppercase;
				}
				a {
					color: #0070f3;
					text-decoration: none;
				}

				a:hover {
					text-decoration: underline;
				}
				.link-wrapper {
					margin: 4rem 0;
					font-family: Roboto, "sans-serif";
				}
			`}</style>
		</>
	);
};

export default MarsRover;
