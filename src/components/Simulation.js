import React from "react";
import monty from '../images/mh.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Simulation.css";


//creating Simulation function which takes in state values from Game component in the form of props
function Simulation(props) {

    //importing all state values and handle functions from Game component
    const {rewardDoor, selectedDoor, revealedDoor, doorClick, reset, counter, keepFunction, switchFunction, result} = props;

    //storing the ID# of each door from 0-2)
    let doorIDs = [
        {
            id: 0
        },
        {
            id: 1
        },
        {
            id: 2
        }
    ]

    //the logic behind how the doors will be shown.
    //iterate through door ID# from the doorIDs array, and display each door based on the if else conditions below
    let showDoors = doorIDs.map( (door, key) => 
    
    {
        //if counter < 1 (if no door has been chosen yet)
        if (counter < 1){
            //return the each door inside a <div> tag (an image for each door is stored in css)
            //the className of the div depends on if a door is clicked. doors are highlighted when hovered (css effect).
            //if a door is clicked, the chosen class restrict any door from being highlighted
            return(
                <div key={key}>
                    <div onClick={doorClick} id={door.id} className={counter > 0? "door door-closed-blocked" : "door door-closed"} ></div>
                </div>
            )
        }

        //else if the counter = 1 (door has been chosen)
        else if (counter === 1){

            //if the current looped door ID# matches the one of the revealedDoor's ID# show a donkey
            if (door.id === revealedDoor){
                return (
                    <div key={key} className="door">
                        <div id={door.id} className= "door door-donkey"></div>
                    </div>
                )
            }
            //else keep the door closed
            else{
                return(
                    <div key={key}>
                        <div onClick={doorClick} id={door.id} className={counter > 0? "door door-closed-blocked" : "door door-closed"}></div>
                    </div>
                )
            }
        }

        //else if counter > 1 (meaning the second choice has been made i.e player clicked 'switch' or 'keep' button)
        else  {
            
            //if the current looped door ID# matches ID# of the selected door AND also happens to be the reward door ID#
            if (door.id === selectedDoor && door.id === rewardDoor){

                //display the reward (meaning player made the correct final choice and win)
                return (
                    <div key={key} className="door">
                        <div id={door.id} className= "door door-reward"></div>
                    </div>
                )
            }
            //else if the current looped door ID# is the selected door but not the door with the reward
            else if (door.id === selectedDoor){
                //we show the donkey (meaning player made the wrong final choice and lost)
                return (
                    <div key={key} className="door">
                        <div id={door.id} className= "door door-donkey"></div>
                    </div>
                )
            }

            //else if the current looped door ID# is the revealed door, keep displaying the donkey (this makes sure the door does not revert back to closed door image)
            else if (door.id === revealedDoor){
                return (
                    <div key={key} className="door">
                        <div id={door.id} className= "door door-donkey"></div>
                    </div>
                )
            }
            //else if the current looped door ID# is the door never selected, keept it closed
            else {
                return(
                    <div key={key}>
                        <div onClick={doorClick} id={door.id} className={counter > 0? "door door-closed-blocked" : "door door-closed"}></div>
                    </div>
                )
            }
        }

        

        
    })

    //function to display the results in text form
    function showResult(){
        //if the result props passed =1, its a win
        if (result === 1){
            return <h2 style = {{color:"green"}}>CONGRATULATIONS! YOU WON!</h2>
        }
        //else if the result props passed =0, its a loss
        else if (result === 0){
            return <h2 style = {{color:"red"}}>OH NO! YOU LOST! </h2>
        }
        //else the game has not finished yet, we return a break for space purpose
        else {
            return (
                <br/>
            )
        }

    }

    //returning the game simulation by displaying the Game Show heading, the doors, the reset button
    //the Keep and Switch buttons (only appear after the 1st door has been chosen)
    return (
        <div className="game-bloc">
            <div className="game-heading">
                <h1 >LET'S MAKE A DEAL </h1>
                <h6 style={{color:"orange"}}>hosted by Monty Hall</h6>

                <img className="host" src={monty} alt="Monty Hall host"/>
            </div>
            
            
            <br/>
            <p className={counter ===1? "decision" : "hidden"}>
                
                    Would you like to keep your door or switch ?<br/>
                    (choose option below)
            </p>
            {showResult()}
            <div className="doors-bloc">
                
                {showDoors}
            </div>
            
            <div className= "button-div">
                <button id="reset" onClick={reset}> Reset</button>
                <button onClick={keepFunction} className={counter ===1? "keep-switch" : "hidden"} > Keep</button>
                <button onClick={switchFunction} className={counter ===1? "keep-switch" : "hidden"} > Switch</button>
            </div>
            

        </div>
    )

}

//export Simulation component
export default Simulation;