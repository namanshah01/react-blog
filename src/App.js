import Navbar from './Navbar'
import Home from './Home'
import Create from './Create';
import BlogDetails from './BlogDetails';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NotFound from './NotFound';
import Update from './Update';
import Login from './Login';
import Register from './Register';

function App() {
	return (
		// <Home />
		<Router>
			<div className="App">
				<Navbar />
				<div className="content">
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/create">
							<Create />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/blog/:slug">
							<BlogDetails />
						</Route>
						<Route exact path="/blog/:slug/update">
							<Update />
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
  );
}

export default App;