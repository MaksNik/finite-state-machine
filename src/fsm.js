class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error();
        }

        this.config = config;
        this.currentState = config.initial;
        this.undoHistory = [];
        this.redoHistory = [];

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
 
        if (this.config.states[state]) {
            this.undoHistory.unshift(this.currentState);
            this.redoHistory.length = 0;
            this.currentState = state;
        }
        else {
            throw new Error();
        }   
     }
       
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
       
        if (this.config.states[this.currentState].transitions[event]) {
            this.redoHistory.length = 0;
            this.changeState(this.config.states[this.currentState].transitions[event]);
        }
        else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var statesAray = [];
        var states=this.config.states;

        if (!event) {
            return statesAray = Object.keys(states);
        }
        else {
            for (var state in states) {
                if (Object.keys(states[state].transitions).includes(event)) {
                    statesAray.push(state);
                }
            }
            return statesAray;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.undoHistory.length) {
            this.redoHistory.unshift(this.currentState);
            this.currentState = this.undoHistory.shift();
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoHistory.length) {
            this.undoHistory.unshift(this.currentState);
            this.currentState=this.redoHistory.shift();
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoHistory.length = 0;
        this.redoHistory.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
