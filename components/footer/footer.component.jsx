import React from "react";
import sprite from "../../public/images/sprite.svg";
import { PRIMARY } from "../../constants/color";
import { github } from "../../constants/url";

const Footer = () => {
	return (
		<>
			<div className="footer_wrapper">
				<footer>
					<a
						href={github}
						className="footer__link"
						target="_blank"
						rel="noreferrer"
						data-testid="github-link"
					>
						<svg data-testid="github-svg">
							<use
								href={`${sprite}#icon-github`}
								className="grid__icon-use"
							></use>
						</svg>
					</a>
					<p className="createdBy">Created by Stephane Candelas.</p>
				</footer>
			</div>
			<style jsx>{`
				.footer_wrapper {
					height: 10vh;
					display: flex;
					padding-left: 4rem;
					background-color: ${PRIMARY};
					display: flex;
					justify-content: center;
					align-items: center;
				}
				footer {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				svg {
					fill: lightgray;
					width: 2rem;
					height: 2rem;
				}
				.createdBy {
					color: lightgray;
					margin-left: 2rem;
					margin-bottom: 0;
					font-size: 1.2rem;
					font-weight: light;
				}
			`}</style>
		</>
	);
};
export { Footer };
