import './App.scss';
import Container from './components/container/container';
import Public from './public.app';
import Prive from './prive.app';
import "antd/dist/antd.css"
import useStart from './hooks/useStart';


function App() {
  const { kirish } = useStart()  
    return (
      <Container>
        {kirish ? <Public /> : <Prive />}
      </Container>
    )
}

export default App;
