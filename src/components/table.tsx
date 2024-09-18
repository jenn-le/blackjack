import React, { useState } from "react";
import "../blackjack.css";
import { Table } from "../schema/app_schema.js";
import { Session } from "../schema/session_schema.js";
import { IFluidContainer, IMember, IServiceAudience, TreeView } from "fluid-framework";
import { PlayerComponent } from "./player.js";
import { DealerComponent } from "./dealer.js";
// import { undefinedUserId } from "../utils/utils.js";

export function TableComponent(props: {
	table: TreeView<typeof Table>;
    username: string;
	sessionTree: TreeView<typeof Session>;
	audience: IServiceAudience<IMember>;
	container: IFluidContainer;
}): JSX.Element {
	// const [currentUser, setCurrentUser] = useState("undefined");
	// const [connectionState, setConnectionState] = useState("");
	// const [saved, setSaved] = useState(false);
	// const [fluidMembers, setFluidMembers] = useState<string[]>([]);

    // const [deck, setD]

	return (
		<div
            className="table"
		>
			{
                // TODO make some kind of header
                /* <Header
				saved={saved}
				connectionState={connectionState}
				fluidMembers={fluidMembers}
				clientId={currentUser}
			    /> */
            }

            {
                // take bets 
            }

            <DealerComponent hand={props.table.root.dealer} />
			{
                props.table.root.players
                    .filter((player) => player.username !== props.username)
                    .map((player) => <PlayerComponent key={player.username} player={player} />)
            }
		</div>
	);
}

export function Header(props: {
	saved: boolean;
	connectionState: string;
	fluidMembers: string[];
	clientId: string;
}): JSX.Element {
	return (
		<div className="h-[48px] flex shrink-0 flex-row items-center justify-between bg-black text-base text-white z-40 w-full">
			<div className="flex m-2">Blackjack</div>
			<div className="flex m-2 ">
				{props.saved ? "saved" : "not saved"} | {props.connectionState} | users:{" "}
				{props.fluidMembers.length}
			</div>
		</div>
	);
}