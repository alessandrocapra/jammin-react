# Operations on Firebase

## Get list of all users

Object.keys(object_name) needs to be use to loop the KEYS of the OBJECT (not Array). With **once('value')**, we get the container object with all the children objects inside. 

`
SEARCH_RESULTS.once('value').then(function(snap){
	let user = snap.val();
        Object.keys(user).map(function (key) {
        	// this will print key: aleborgo, key: another:username ...
		console.log('key:', key);
        });
});

`

## Get list of properties inside user

To achieve this, we need to modify **once('value')** to **on('child_added'). The code above will then return not the usernames of the users, but the keys like name, surname, instruments etc.


