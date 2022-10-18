export async function load () {
	let response = await fetch('http://jsonplaceholder.typicode.com/users')
	return await response.json();
}
