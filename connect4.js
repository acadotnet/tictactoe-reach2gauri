//jquery code to execute as soon as page is ready
$(document).ready(function () {
    //class to create 6 by 7 connect4 slots 
    class Connect {
        constructor(xPos, yPos) {
            this._xPos = xPos;
            this._yPos = yPos;
            this._value;
            this._isChecked = false;
        }
        //getter fand setter or properties of constructor object class Connect
        get xPos() {
            return this._xPos;
        }
        get yPos() {
            return this._yPos;
        }
        get value() {
            return this._value;
        }
        set value(screenValue) {
            this._value = screenValue;
        }
        get isChecked() {
            return this._isChecked;
        }
        set isChecked(ischeckedValue) {
            this._isChecked = ischeckedValue;
        }
        //function to check and set the value of connect slot
        setConnectSlot(play) {
            if (!this._isChecked) {
                this._value = play;
            }
            this._isChecked = !this._isChecked;
        }
    }

    //constructor class for connect4 Board
    class ConnectBoard {
        constructor(connects) {
            this._connects = connects;
            this._nextPlay = 'red';
        }
        //getter for properties of constructor class
        get connects() {
            return this._connects;
        }
        get nextPlay() {
            return this._nextPlay;
        }
        //function to make move to a particular slot as per connect4 game
        makeMove(y) {
            var noMoreMove = false;
            var slotFilled;
            for (var i = 0; i < this._connects.length; i++) {
                if (this._connects[i].yPos == y) {
                    if (this._connects[i].isChecked) {
                        console.log("no more slots at this column position " + y);
                        console.log("make some other move");
                        noMoreMove = true;
                        break;
                    } else {
                        if (this._connects[i + 7].isChecked) {
                            this._connects[i].setConnectSlot(this._nextPlay);
                            slotFilled = i;
                            break;
                        } else {
                            if (this._connects[i + 14].isChecked) {
                                this._connects[i + 7].setConnectSlot(this._nextPlay);
                                slotFilled = i + 7;
                                break;
                            } else {
                                if (this._connects[i + 21].isChecked) {
                                    this._connects[i + 14].setConnectSlot(this._nextPlay);
                                    slotFilled = i + 14;
                                    break;
                                } else {
                                    if (this._connects[i + 28].isChecked) {
                                        this._connects[i + 21].setConnectSlot(this._nextPlay);
                                        slotFilled = i + 21;
                                        break;
                                    } else {
                                        if (this._connects[i + 35].isChecked) {
                                            this._connects[i + 28].setConnectSlot(this._nextPlay);
                                            slotFilled = i + 28;
                                            break;
                                        } else {
                                            this._connects[i + 35].setConnectSlot(this._nextPlay);
                                            slotFilled = i + 35;
                                            break;
                                        }

                                    }

                                }

                            }

                        }

                    }
                }
            }
            if (!noMoreMove) {
                if (this._nextPlay == 'red') {
                    this._nextPlay = 'blue';
                } else {
                    this._nextPlay = 'red';
                }
                //return the slot filled to jquery code for HTML allocation
                return slotFilled;
            }
        }
        // function to reset all the slots of connect
        reset() {
            for (var i = 0; i < this._connects.length; i++) {
                this._connects[i].isChecked = false;
                this._connects[i].value = ' ';
                this._nextPlay = 'red';
            }
        }

        //function to check if we have four slot winner
        checkWinner() {
            var isWinner = false;
            for (var i = 0; i < this._connects.length; i++) {
                if (this._connects[i].isChecked) {
                    //look for horizontal win
                    if ((this._connects[i + 1]) && (this._connects[i + 2]) && (this._connects[i + 3])) {
                        if ((this._connects[i].xPos == this._connects[i + 1].xPos) &&
                            (this._connects[i + 1].xPos == this._connects[i + 2].xPos) &&
                            (this._connects[i + 2].xPos == this._connects[i + 3].xPos)) {
                            isWinner = this.checkWinnerLogic(i, i + 1, i + 2, i + 3);
                            if (isWinner) {
                                break;
                            }
                        }
                    }
                    //look for vertical win
                    if ((this._connects[i + 7]) && (this._connects[i + 14]) && (this._connects[i + 21])) {
                        isWinner = this.checkWinnerLogic(i, i + 7, i + 14, i + 21);
                        if (isWinner) {
                            break;
                        }
                    }
                    //look for l-to-r diagonal win
                    if ((this._connects[i + 8]) && (this._connects[i + 16]) && (this._connects[i + 24])) {
                        var diagLRSlotX1 = this._connects[i].xPos + 1;
                        var diagLRSlotX2 = this._connects[i].xPos + 2;
                        var diagLRSlotX3 = this._connects[i].xPos + 3;
                        var diagLRSlotY1 = this._connects[i].yPos + 1;
                        var diagLRSlotY2 = this._connects[i].yPos + 2;
                        var diagLRSlotY3 = this._connects[i].yPos + 3;
                        if (((this._connects[i + 8].xPos == diagLRSlotX1) && (this._connects[i + 8].yPos == diagLRSlotY1)) &&
                            ((this._connects[i + 16].xPos == diagLRSlotX2) && (this._connects[i + 16].yPos == diagLRSlotY2)) &&
                            ((this._connects[i + 24].xPos == diagLRSlotX3) && (this._connects[i + 24].yPos == diagLRSlotY3))) {
                            isWinner = this.checkWinnerLogic(i, i + 8, i + 16, i + 24);
                            if (isWinner) {
                                break;
                            }
                        }
                    }
                    //look for r-to-l diagonal win
                    if ((this._connects[i + 6]) && (this._connects[i + 12]) && (this._connects[i + 18])) {
                        var diagRLSlotX1 = this._connects[i].xPos + 1;
                        var diagRLSlotX2 = this._connects[i].xPos + 2;
                        var diagRLSlotX3 = this._connects[i].xPos + 3;
                        var diagRLSlotY1 = this._connects[i].yPos - 1;
                        var diagRLSlotY2 = this._connects[i].yPos - 2;
                        var diagRLSlotY3 = this._connects[i].yPos - 3;
                        if (((this._connects[i + 6].xPos == diagRLSlotX1) && (this._connects[i + 6].yPos == diagRLSlotY1)) &&
                            ((this._connects[i + 12].xPos == diagRLSlotX2) && (this._connects[i + 12].yPos == diagRLSlotY2)) &&
                            ((this._connects[i + 18].xPos == diagRLSlotX3) && (this._connects[i + 18].yPos == diagRLSlotY3))) {
                            isWinner = this.checkWinnerLogic(i, i + 6, i + 12, i + 18);
                            if (isWinner) {
                                break;
                            }
                        }
                    }
                }
            }
        }
        checkWinnerLogic(first, second, third, fourth) {
            if (this._connects[first].isChecked && this._connects[second].isChecked &&
                this._connects[third].isChecked && this._connects[fourth].isChecked) {
                if ((this._connects[first].value == this._connects[second].value) &&
                    (this._connects[second].value == this._connects[third].value) &&
                    (this._connects[third].value == this._connects[fourth].value)) {
                    console.log('Player ' + this.connects[first].value + ' is a winner winner chicken dinner!');
                    return true;
                }
            }

        }
    }
    //create a array of connect slots 
    var connectSlots = [];
    connectSlots.push(new Connect(0, 0));
    connectSlots.push(new Connect(0, 1));
    connectSlots.push(new Connect(0, 2));
    connectSlots.push(new Connect(0, 3));
    connectSlots.push(new Connect(0, 4));
    connectSlots.push(new Connect(0, 5));
    connectSlots.push(new Connect(0, 6));

    connectSlots.push(new Connect(1, 0));
    connectSlots.push(new Connect(1, 1));
    connectSlots.push(new Connect(1, 2));
    connectSlots.push(new Connect(1, 3));
    connectSlots.push(new Connect(1, 4));
    connectSlots.push(new Connect(1, 5));
    connectSlots.push(new Connect(1, 6));

    connectSlots.push(new Connect(2, 0));
    connectSlots.push(new Connect(2, 1));
    connectSlots.push(new Connect(2, 2));
    connectSlots.push(new Connect(2, 3));
    connectSlots.push(new Connect(2, 4));
    connectSlots.push(new Connect(2, 5));
    connectSlots.push(new Connect(2, 6));

    connectSlots.push(new Connect(3, 0));
    connectSlots.push(new Connect(3, 1));
    connectSlots.push(new Connect(3, 2));
    connectSlots.push(new Connect(3, 3));
    connectSlots.push(new Connect(3, 4));
    connectSlots.push(new Connect(3, 5));
    connectSlots.push(new Connect(3, 6));

    connectSlots.push(new Connect(4, 0));
    connectSlots.push(new Connect(4, 1));
    connectSlots.push(new Connect(4, 2));
    connectSlots.push(new Connect(4, 3));
    connectSlots.push(new Connect(4, 4));
    connectSlots.push(new Connect(4, 5));
    connectSlots.push(new Connect(4, 6));

    connectSlots.push(new Connect(5, 0));
    connectSlots.push(new Connect(5, 1));
    connectSlots.push(new Connect(5, 2));
    connectSlots.push(new Connect(5, 3));
    connectSlots.push(new Connect(5, 4));
    connectSlots.push(new Connect(5, 5));
    connectSlots.push(new Connect(5, 6));

    //create the 6 by 7 connect4 board
    var theGame = new ConnectBoard(connectSlots);

    var slotsFilled;
    //as soon as player select a slot, the move is made based on slot selected
    $('.slot').click(function (e) {
        var idvalue = $(this).attr("id");
        switch (idvalue) {
            case "slot0":
            case "slot7":
            case "slot14":
            case "slot21":
            case "slot28":
            case "slot35":
                slotsFilled = theGame.makeMove(0);
                theGame.checkWinner();
                break;
            case "slot1":
            case "slot8":
            case "slot15":
            case "slot22":
            case "slot29":
            case "slot36":
                slotsFilled = theGame.makeMove(1);
                theGame.checkWinner();
                break;
            case "slot2":
            case "slot9":
            case "slot16":
            case "slot23":
            case "slot30":
            case "slot37":
                slotsFilled = theGame.makeMove(2);
                theGame.checkWinner();
                break;
            case "slot3":
            case "slot10":
            case "slot17":
            case "slot24":
            case "slot31":
            case "slot38":
                slotsFilled = theGame.makeMove(3);
                theGame.checkWinner();
                break;
            case "slot4":
            case "slot11":
            case "slot18":
            case "slot25":
            case "slot32":
            case "slot39":
                slotsFilled = theGame.makeMove(4);
                theGame.checkWinner();
                break;
            case "slot5":
            case "slot12":
            case "slot19":
            case "slot26":
            case "slot33":
            case "slot40":
                slotsFilled = theGame.makeMove(5);
                theGame.checkWinner();
                break;
            case "slot6":
            case "slot13":
            case "slot20":
            case "slot27":
            case "slot34":
            case "slot41":
                slotsFilled = theGame.makeMove(6);
                theGame.checkWinner();
                break;
        }
        //fill the selected slot by RED (bg-danger) or BLUE (bg-primary) color
        var idSelector = '#slot' + slotsFilled;
        if (theGame.connects[slotsFilled].value == 'red') {
            $(idSelector).addClass('bg-danger');
        } else {
            $(idSelector).addClass('bg-primary');
        }
    });
    //reset all the boxes in connect
    $('#reset').click(function (e) {
        $('.slot').removeClass('bg-danger')
                  .removeClass('bg-primary');
        theGame.reset();
    });
});