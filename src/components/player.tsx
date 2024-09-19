import React from "react";
import { Player } from "../schema/app_schema.js";
import { HandComponent } from "./hand.js";

export function PlayerComponent(props: {
	player: Player;
    class: string
}): JSX.Element {
	return (
		<div
			className={props.class}
		>
			<div id="player-pic" />
            <h1>{props.player.username}</h1>
            {
                props.player.hand !== undefined ? <HandComponent hand={props.player.hand} /> : undefined
            }
		</div>
	);
}