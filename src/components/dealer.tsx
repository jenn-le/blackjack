import React from "react";
import { Hand } from "../schema/app_schema.js";
import { HandComponent } from "./hand.js";

export function DealerComponent(props: {
	hand: Hand;
}): JSX.Element {

	return (
		<div
			id="player"
		>
			<div className="player-info">
                <div className="player-pic" />
                <h1>dealer</h1>
            </div>
            <HandComponent dealer={true} hand={props.hand} />
		</div>
	);
}

