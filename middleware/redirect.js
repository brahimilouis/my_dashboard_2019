export default function ({ store, redirect, route}) {
	if (store.state.auth && route.name === 'login') {
		redirect('/dashboard');
	} else if (!store.state.auth && route.name !== 'login') {
		redirect('/users/login');
	}
}