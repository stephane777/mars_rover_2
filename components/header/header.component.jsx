import React from "react";
import sprite from "../../public/images/sprite.svg";
import nasa from "../../public/images/nasa.svg";
import { WHITE, PRIMARY } from "../../constants/color";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
	const router = useRouter();
	const { pathname } = router;

	return (
		<>
			<header className="header">
				<div className="logo-wrapper">
					<img src={nasa} alt="nasa logo" className="logo" />
					<span className="name">MARS ROVER</span>
				</div>
				{pathname != "/" && (
					<Link href="/">
						<a>
							<svg data-testid="home-svg">
								<use href={`${sprite}#icon-home`}></use>
							</svg>
						</a>
					</Link>
				)}
			</header>
			<style jsx>{`
				.header {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 10vh;
					display: flex;
					padding: 0 4rem;
					background-color: ${PRIMARY};
				}
				.logo-wrapper {
					display: flex;
					align-items: center;
				}
				.logo {
					width: 6rem;
					height: 6rem;
				}
				svg {
					fill: ${WHITE};
					width: 2rem;
					height: 2rem;
				}
				.name {
					margin-left: 1rem;
					font-size: 2rem;
					color: ${WHITE};
					font-family: "helvetica", sans-serif;
				}
			`}</style>
		</>
	);
};
export { Header };
