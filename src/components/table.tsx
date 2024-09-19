import React, { useEffect, useState } from "react";
import "../blackjack.css";
import { Hand, Player, Table } from "../schema/app_schema.js";
import { Session } from "../schema/session_schema.js";
import { IFluidContainer, IMember, IServiceAudience, Tree, TreeView } from "fluid-framework";
import { PlayerComponent } from "./player.js";
import { DealerComponent } from "./dealer.js";
// import { undefinedUserId } from "../utils/utils.js";

export function TableComponent(props: {
	view: TreeView<typeof Table>;
    username: string;
	sessionTree: TreeView<typeof Session>;
	audience: IServiceAudience<IMember>;
	container: IFluidContainer;
}): JSX.Element {
	// const [currentUser, setCurrentUser] = useState("undefined");
	// const [connectionState, setConnectionState] = useState("");
	// const [saved, setSaved] = useState(false);
	// const [fluidMembers, setFluidMembers] = useState<string[]>([]);

    // copy all the state
	// to force a re-render when the array changes
	const [players, setPlayers] = useState<Player[]>(
		props.view.root.players.map((player) => player),
	);

    console.log(players.map((player) => player.username));

    // TODO: this is super bs, we want a way to store the money associated with each player (prob separate tree)
    // but only the people in the session should be part of the players
    const [inGame, setInGame] = useState<boolean>(
        players.filter((player) => (player.username === props.username)).length === 1
    );

    if (!inGame) {
        props.view.root.addPlayer(props.username);
    }

    // TODO assert there's only one
    const [mainPlayer, setMainPlayer] = useState<Player>(players
        .filter((player) => player.username === props.username)[0]);
    const [betMade, setBetMade] = useState<boolean>(mainPlayer.hand !== undefined);

	useEffect(() => {
		const unsubscribe = Tree.on(props.view.root.players, "nodeChanged", () => {
			setPlayers(props.view.root.players.map((player) => player));
            const main = players.filter((player) => (player.username === props.username));
            setInGame(main.length === 1);
            setMainPlayer(main[0]);
		});
		return unsubscribe;
	}, []);

    const handleMakeBetClick = (e: React.MouseEvent) => {
		e.stopPropagation();
        // TODO: allow bets to be changed
		mainPlayer.hand = new Hand({ bet: 25, cards: [] });
        setBetMade(true);

        let allBetsMade = true;
        players.forEach((player) => {
            if (player.hand === undefined) {
                allBetsMade = false;
            }
        })

        if (allBetsMade) {
            // TODO: better type checking
            for (let i = 0; i < 2; i++) {
                dealCard(props.view.root.dealer!);
                players.forEach((player) => {
                    dealCard(player.hand!);
                })
            }
        }
	};

    const dealCard = (hand: Hand) => {
       // deal to each player in order
       const card = props.view.root.deck.deal();
       hand.cards.insertAtEnd(card);
       console.log(`card ${card.rank}${card.suit} dealt`)
    };

	return (
		<div
            className="table"
		>
			{
                // TODO make some kind of header maybe?
                /* <Header
				saved={saved}
				connectionState={connectionState}
				fluidMembers={fluidMembers}
				clientId={currentUser}
			    /> */
            }
            <div className="other-players">
                <DealerComponent hand={props.view.root.dealer} />
                {
                    props.view.root.players
                        .filter((player) => player.username !== props.username)
                        .map((player) => <PlayerComponent class="other" key={player.username} player={player} />)
                }
            </div>
            {
                !betMade ?
                    <div className="make-bet main-player">
                        <button
                            color="white"
                            onClick={(e: React.MouseEvent) => handleMakeBetClick(e)}
                        >
                            make bet
                        </button>
                    </div> :
                    <div className="main-player">
                        <PlayerComponent class="main" player={mainPlayer} />
                    </div>
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