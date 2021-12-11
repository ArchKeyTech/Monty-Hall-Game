import React from "react";
import Simulation from './Simulation';
import "./Simulation.css";

//creating Game class which holds the various functions to run the game smoothly
class Game extends React.Component {
    constructor() {
        super();

        //the event handler for the door click
        this.onDoorClickEvent = this.onDoorClickEvent.bind(this);
        //the reset handler to reset the game when the player wishes
        this.reset = this.reset.bind(this);
        //the count increment to keep track of clicks/options made by the player
        this.countIncrement = this.countIncrement.bind(this);
        //handler to keep track of whether the player chose to switch their door on their last decision
        this.doorSwitch = this.doorSwitch.bind(this);
        ////handler to keep track of whether the player chose to keep their door on their last decision
        this.doorKeep = this.doorKeep.bind(this);

        //the states to be tracked throughout the game simulation
        this.state = {
            //setting the random id# for the door with the winner's reward
            rewardDoor: Math.floor(Math.random() * 3),
            //the state of the door selected by the player (initially set to -1 as default to indicated none)
            selectedDoor: -1,
            //the state of the door revealed after the player's first choice (initially set to -1 as default to indicated none)
            revealedDoor: -1,
            //counter to keep track of player clicks on doors and buttons
            clickCount: 0,
            //result of the game (1 is a win, 0 is a loss. -1 is default)
            result: -1,
        }

    }


    //resetting the game by setting all state values to default
    reset() {
        this.setState({

            //setting the random id# for the door with the winner's reward
            rewardDoor: Math.floor(Math.random() * 3),
            //the state of the door selected by the player (initially set to -1 as default to indicated none)
            selectedDoor: -1,
            //the state of the door revealed after the player's first choice (initially set to -1 as default to indicated none)
            revealedDoor: -1,
            //counter to keep track of player clicks on doors and buttons
            clickCount: 0,
            //result of the game (1 is a win, 0 is a loss. -1 is default)
            result: -1,
        })
    }

    //incrementing the count by adding 1 to the previous clickCount state
    countIncrement() {
        this.setState((prevState) => ({
            clickCount: prevState.clickCount +1
        }))
    }

    //doorSwitch function, linked to switch button. 
    //switch button to only appear after 1st door click has happened (we only present the option to switch doors after the player has chosen their 1st door)
    doorSwitch(){

        //when this button is clicked we increment the count to reflect that a move has been played
        this.countIncrement();

        //fetch ID# of door revealed
        const revealedDoor = this.state.revealedDoor

        //store the new door selected by the player after the switch
        //this line picks the door ID# which is not the revealed door's ID# or the current selected door
        const selectedDoor = [0,1,2].find((door) => door !==revealedDoor &&
        door!== this.state.selectedDoor)

        //once we get the new selected door ID# we update its state to reflect the changed door
        this.setState ({
            selectedDoor: selectedDoor
        })

        //if the new door selected is the reward door
        if (selectedDoor === this.state.rewardDoor){
            //set result state to 1, which means a WIN
            this.setState({
                result: 1
            })
        }
        //else we set the result state to 0, which means a LOSS
        else {
            this.setState({
                result: 0
            })
        }
    }

    //doorKeep function, linked to 'keep' button. 
    //keep button to only appear after 1st door click has happened (we only present the option to keep the door after the player has chosen their 1st door)
    doorKeep(){

        //when this button is clicked we increment the count to reflect that a move has been played
        this.countIncrement();

        //if the door selected (the door the player kept) is the reward door
        if (this.state.selectedDoor === this.state.rewardDoor){
            this.setState({
                result: 1
            })
        }
        //else we set the result state to 0, which means a LOSS
        else {
            this.setState({
                result: 0
            })
        }
    }


    //onDoorClickEvent function, linked to the 3 doors at the start of the game (before a door is chosen)
    //this function triggers when one of the 3 doors is chosen by the player
    onDoorClickEvent(e) {

        //store the current click count
        const counter = this.state.clickCount;

        //door with reward from its current state
        const rewardDoor = this.state.rewardDoor;

        //element of door that is clicked links to door#
        //const selectedDoor = parseInt(e.target.id);
        

        //if the counter is < 1 (meaning if this is the first move played)
        if (counter < 1){
            //increment the click count
            this.countIncrement();

            //door revealed: //this line picks the door ID# which is not the reward door's ID# or the door that clicked by the player
            const revealedDoor = [0,1,2].find((door) => door !==rewardDoor &&
            door !== parseInt(e.target.id));

            //set state of selected door to reflect clicked door's ID# and set state of revealed door
            this.setState ({
                selectedDoor: parseInt(e.target.id),
                revealedDoor: revealedDoor
             });
             

        }


    }

    //rendering of the game
    render (){
        //return the Simulation component with the Game's component states passed down as props
        return (
            <div>
                <div className="Game">
                    <Simulation result={this.state.result} rewardDoor = {this.state.rewardDoor}
                    selectedDoor = {this.state.selectedDoor} revealedDoor = {this.state.revealedDoor}
                    doorClick = {this.onDoorClickEvent} reset ={this.reset} counter = {this.state.clickCount}
                    keepFunction = {this.doorKeep} switchFunction={this.doorSwitch}/>
                </div>
            </div>
        )
    }


}
//exporting the Game component
export default Game;


