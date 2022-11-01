import { makeAutoObservable, runInAction } from "mobx";

export default class Users {
	usersInitial = [];
	users = [];
	usersNum = 0;
	loading = false;
	// chekedUsers = [];

	// item(id) {
	// 	// console.log('item');
	// 	return this.users.find(pr => pr.id == id);
	// }

	async load() {
		this.loading = true;
		let usersInitial = await this.api.load();
		runInAction(() => {
			this.usersInitial = usersInitial;
			this.createUsersList(usersInitial);
			this.usersNum = usersInitial.length;
			this.loading = false
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
		// this.users = this.users.map(user => user.id === id ? { ...user, checked } : user)
		this.users.forEach(user => {
			if (user.id === id ) {
				user.checked = checked
				console.log(this.users);
			}
		})
	}

	changeCheckedAll = (checked) => {
		this.users.forEach(user => {
			user.checked = checked
		})
	}

	getCountChecked = () => {
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

	sorted = (field, reverse) => {
		// После фильтрации не работает сортировка, исправлено присваиванием нового массива в this.users
		if (field === 'id') {
			// this.users.sort((a, b) => a[field] - b[field])

			let newArr = [...this.users]
			newArr.sort((a, b) => a[field] - b[field])
			this.users = newArr;

		}
		else {
			// this.users.sort((a, b) => a[field].localeCompare(b[field]))

			let newArr = [...this.users]
			newArr.sort((a, b) => a[field].localeCompare(b[field]))
			this.users = newArr;
		}

		if (reverse === 'true') {
			// this.users.reverse();

			let newArr = [...this.users]
			newArr.reverse();
			this.users = newArr;
		}
	}

	search = (filter) => {
		// console.log('---', filter);
		let query = filter.query;
		let field = filter.field;
		let filterUsers
		if (field === 'all') {
			filterUsers = this.users.filter(user => (
				user['name'].toLowerCase().includes(query.toLowerCase()) ||
				user['username'].toLowerCase().includes(query.toLowerCase()) ||
				user['email'].toLowerCase().includes(query.toLowerCase()) ||
				user['phone'].toLowerCase().includes(query.toLowerCase()) ||
				user['zipcode'].toLowerCase().includes(query.toLowerCase())
			))
		}
		else {
			filterUsers = this.users.filter(user => user[field].toLowerCase().includes(query.toLowerCase()))
		}

		return filterUsers;

	}

	constructor(rootStore) {
		makeAutoObservable(this)
		this.rootStore = rootStore;
		this.api = this.rootStore.api.users;
	}
}
