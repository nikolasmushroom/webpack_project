import  {useState} from 'react';
import './App.scss'

type Props = {};
export const App = (props: Props) => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(prev => prev + 1);
    return (
        <div>
            My webpack app
            <div>
                Counter value: {count}
            </div>
            <button onClick={increment}>Increment counter</button>
        </div>
    );
};