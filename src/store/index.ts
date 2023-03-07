import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from './modules/auth';

export interface State {
	auth: typeof auth.state;
}

type ReturnGetters<
	T extends {
		[key: string]: (...args: any) => any;
	}
> = {
	[P in keyof T]: ReturnType<T[P]>;
};

type GettersFuncs = typeof auth.getters;

type Getters = ReturnGetters<GettersFuncs>;

type CommitFuncs = typeof auth.mutations;

export interface Commit {
	<T extends keyof CommitFuncs>(
		type: T,
		payload?: Parameters<CommitFuncs[T]>[1]
	): void;
}

const store = createStore<State>({
	plugins: [createPersistedState()],
	modules: {
		auth: auth as any,
	},
});

export default store;

type DispatchFuncs = typeof auth.actions;
export interface Dispatch {
	<T extends keyof DispatchFuncs>(
		type: T,
		payload?: Parameters<DispatchFuncs[T]>[1]
	): Promise<any>;
}

export const { state } = store;
export const { getters }: { getters: Getters } = store; // 定义 getters 的类型
export const { commit }: { commit: Commit } = store; // 定义 commit 的类型
export const { dispatch }: { dispatch: Dispatch } = store; // 定义 commit 的类型

export interface Store {
	state: State;
	getters: Getters;
	commit: Commit;
	dispatch: Dispatch;
}
