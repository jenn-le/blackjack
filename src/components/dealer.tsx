import React from "react";
import { Hand } from "../schema/app_schema.js";
import { HandComponent } from "./hand.js";

export function DealerComponent(props: {
	hand: Hand | undefined;
}): JSX.Element {

	return (
		<div
			id="player"
		>
			<div id="player-pic" />
            <h1>dealer</h1>
            {
                props.hand !== undefined ? <HandComponent hand={props.hand} /> : undefined
            }
		</div>
	);
}

