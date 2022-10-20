import { makeAutoObservable, runInAction } from "mobx";

export default class Users {
	usersInitial = [];
	users = [];
	usersNum = 0;
	// chekedUsers = [];

	// item(id) {
	// 	// console.log('item');
	// 	return this.users.find(pr => pr.id == id);
	// }

	async load() {
		let usersInitial = await this.api.load();
		runInAction(() => {
			this.usersInitial = usersInitial;
			this.createUsersList(usersInitial);
			this.usersNum = usersInitial.length;
		})
	}

	createUsersList = (list) => {
		let users = [];
		list.forEach(user => {
			users.push({
				'id': user.id,
				'name': user.name,
				'username': user.username,
				'email': user.email,
				'phone': user.phone,
				'zipcode': user.address.zipcode,
				'checked': false,
			})
		})
		this.users = users;
	}

	/* sorted = (field, reverse) => {
		let sortedUsers = this.users.slice();
		if (field === 'id') {
			sortedUsers = sortedUsers.sort((a, b) => a[field] - b[field])
		}
		else {
			sortedUsers = sortedUsers.sort((a, b) => a[field].localeCompare(b[field]))
		}

		if (reverse === 'true') {
			sortedUsers.reverse();
		}

		return sortedUsers;
	} */

	sorted = (field, reverse) => {
		if (field === 'id') {
			this.users.sort((a, b) => a[field] - b[field])
		}
		else {
			this.users.sort((a, b) => a[field].localeCompare(b[field]))
		}

		if (reverse === 'true') {
			this.users.reverse();
		}
	}

	add = (user) => {
		user = { id: this.usersNum + 1, ...user }
		this.users.push(user);
		++this.usersNum;
	}

	remove = () => {
		// this.users = this.users.filter(user => !usersId.includes(user.id))
		this.users = this.users.filter(user => user.checked !== true)
	}

	changeChecked = (id, checked) => {
		this.users = this.users.map(user => user.id === id ? {...user, checked}  : user)
	}

	changeCheckedAll = (checked) => {
		this.users.forEach(user => {
			user.checked = checked
		})
	}

	getCountChecked = ()=>{
		let count = 0;
		this.users.forEach(item => item.checked === true ? ++count : null)
		return count;
	}

	/* getChecked = ()=>{
		let checkedUsers = [];
		this.users.forEach(user=>{
			if (user.checked === true) {
				checkedUsers.push(user)
			}
		})
		return checkedUsers;
	} */


	constructor(rootStore) {
		makeAutoObservable(this)
		this.rootStore = rootStore;
		this.api = this.rootStore.api.users;
	}
}
