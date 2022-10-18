import Users from "./users";

import * as users from '../api/users'

export default class RootStore {
	constructor() {
		this.api = {users}

		this.users = new Users(this);
	}
}
