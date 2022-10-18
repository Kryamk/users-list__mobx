import { makeAutoObservable, runInAction } from "mobx";

export default class Users {
	usersInitial = [];
	users = [];

	// item(id) {
	// 	// console.log('item');
	// 	return this.users.find(pr => pr.id == id);
	// }

	async load() {
		let usersInitial = await this.api.load();
		runInAction(() => {
			this.usersInitial = usersInitial;
			this.createUsersList(usersInitial)
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
			})
		})
		this.users = users;
	}

	sorted = (field, reverse) => {
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
	}

	constructor(rootStore) {
		makeAutoObservable(this)
		this.rootStore = rootStore;
		this.api = this.rootStore.api.users;
	}
}
