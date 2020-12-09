import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export async function getAllActvities(){
    // let allNotes={};
    let todosKeys=[];
    firebase.database().ref('Activities').on('value', (snapshot)=> {
        // console.log(`snapshot value is: ${snapshot.val()}`);
        // let data = snapshot.val() ? snapshot.val() : {};
        // let todoItems = {...data};
        // allNotes=todoItems;
        todosKeys = Object.keys(snapshot.val());
        });
         
    return todosKeys;
}
