import { HomePage } from "./pages/HomePage";
import {Route}  from "react-router-dom";
import {Switch} from "react-router-dom";
import {BoardPage} from "./pages/BoardPage"

function App() {
  
  return (
    <Switch>
    <Route path="/" exact> 
    <HomePage/>
      </Route>
      
    <Route path='/boards/:boardId' exact>
      <BoardPage/>
    </Route>
    </Switch>
    
  );
}

export default App;
