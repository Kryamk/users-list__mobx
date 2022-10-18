import { makeAutoObservable, runInAction } from "mobx";

export default class Users {
	users = [];

	item(id) {
		// console.log('item');
		return this.users.find(pr => pr.id == id);
	}

	async load() {
		let users = await this.api.load();
		runInAction(() => {
			this.users = users;
		})
	}

	sorted = (field, reverse) =>{
		let sortedUsers = this.users.slice();
		if (field === 'name' ) {
			sortedUsers = sortedUsers.sort((a, b) => a[field].localeCompare(b[field]))
		}
		else if (field === 'id' ) {
			sortedUsers = sortedUsers.sort((a,b)=> a[field] - b[field])
		}
		else if (field === 'zipcode' ) {
			sortedUsers = sortedUsers.sort((a, b) => a.address[field].localeCompare(b.address[field]))
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
