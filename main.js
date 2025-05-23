// the reason why state count is at 0,we want it to start with 0 that is a default value
function counterReducer(state ={count: 0},action) { // A function written like this compares two things
if (action.type ==='ADD') { // so what im saying is if someone says Add it will add 
    return{count: state.count + 1};// and it will return a new object with a updated number 
}

if (action.type ==='SUBTRACT') {// so what im saying here is if someone subtract 1
    return{count: state.count - 1};// return with a new object which will be -1 
}

if (action.type ==='RESET'){ // if you enter reset it will go back to default value which is 0
    return{count: 0};
}
    return state;
}

function createStore (reducer){
    let state = reducer(undefined,{});// so over here we do not yet know what the number is so because state count is 0 we will start with 0 because its the default value
    let listeners = [];// this is listenes for when the default value will change

    return {
        getState: function (){// so what this is basically the current state of the number you are able to see 
            return state;
        },
        // What this function does it shows you the current state as soon as the state change the listener does
        // his job an listen for when the value has changed
        dispatch: function(action) {
            state = reducer(state,action);
            listeners.forEach(listener => listener());
        },

        subscribe: function(listener) {
            listeners.push(listener);
        }
    }
};

const store = createStore (counterReducer);

store.subscribe(function () {// so this function is for when the number changes it has been console log so it will show in the console on you browser
console.log("The number now is",store.getState().count);
});

console.log("Initial number:", store.getState().count); //this just mean what it is asking what is the current state now which will be 

store.dispatch ({type: 'ADD'});//this sends the signal to the reducer to add +1 
store.dispatch ({type: 'ADD'});

store.dispatch({type: 'SUBTRACT'});// this send the signal to the reducer to subtract which mean -1 

store.dispatch({type: 'RESET'});// this sends the signal to the reducer to basically reset everything back to default value