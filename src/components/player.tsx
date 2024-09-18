import React from "react";
import { Hand, Player } from "../schema/app_schema.js";

export function PlayerComponent(props: {
	player: Player;
	// container: IFluidContainer;
}): JSX.Element {
	// const [currentUser, setCurrentUser] = useState("undefined");
	// const [connectionState, setConnectionState] = useState("");
	// const [saved, setSaved] = useState(false);
	// const [fluidMembers, setFluidMembers] = useState<string[]>([]);

	return (
		<div
			id="player"
		>
			<div id="player-pic" />
            <h1>{props.player.username}</h1>
		</div>
	);
}

export function HandComponent(props: {
    hand: Hand;
	// container: IFluidContainer;
}): JSX.Element {
	// const [currentUser, setCurrentUser] = useState("undefined");
	// const [connectionState, setConnectionState] = useState("");
	// const [saved, setSaved] = useState(false);
	// const [fluidMembers, setFluidMembers] = useState<string[]>([]);

	return (
		<div
			id="hand"
		>
			
		</div>
	);
}