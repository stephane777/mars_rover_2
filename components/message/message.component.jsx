import React from "react";
import {
	ALERT,
	BG_ALERT,
	BORDER_ALERT,
	INFO,
	BG_INFO,
	BORDER_INFO,
	SUCCESS,
	BG_SUCCESS,
	BORDER_SUCCESS,
} from "../../constants/color";
import { useCustomContext } from "../../store/ContextProvider";

const Message = ({ type, content }) => {
	const { state, dispatch } = useCustomContext();

	React.useEffect(() => {
		setTimeout(() => dispatch({ type: "RESET_MESSAGE" }), 2000);
	}, [type, content]);

	return (
		<>
			<div className="message_wrapper">
				{type && <p className={`message ${type}`}>{content}</p>}
			</div>
			<style jsx>{`
				.message {
					width: 40rem;
					font-size: 1.6rem;
					font-weight: bold;
					text-align: center;
					padding: 1rem;
					border-radius: 6px;
				}
				.error {
					color: ${ALERT};
					background-color: ${BG_ALERT};
					border-color: ${BORDER_ALERT};
				}
				.info {
					color: ${INFO};
					background-color: ${BG_INFO};
					border-color: ${BORDER_INFO};
				}
				.success {
					color: ${SUCCESS};
					background-color: ${BG_SUCCESS};
					border-color: ${BORDER_SUCCESS};
				}
			`}</style>
		</>
	);
};
export { Message };
