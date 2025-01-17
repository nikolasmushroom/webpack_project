import {useState} from 'react';
import classes from './App.module.scss'
import {Link, Outlet} from "react-router-dom";
import About from "@/pages/about/About";
import avatarJpg from '@/assets/Layer 2.jpg'
import avatarPng from '@/assets/avatar.png'
import AvatarSvg from '@/assets/Layer 2 (4).svg'

function TODO(){
   TODO2()
}
function TODO2(){
    throw new Error('Error')
}
export const App = (props: {}) => {

    const [count, setCount] = useState(0);
    const increment = () => setCount(prev => prev + 1);
    // if (__PLATFORM__ === 'mobile') {
    //     return <div>ISMOBILEPLATFORM</div>
    // }
    // if (__PLATFORM__ === 'desktop') {
    //     return <div>ISDESKTOPPLATFORM</div>
    // }
    return (
        <div data-testid="App.DataTestId">
            <h1>PLATFORM={__PLATFORM__}</h1>
            <div style={{background: 'black'}}>
                <img src={avatarJpg} alt=""/>
            </div>
            <div style={{background: 'green'}}>
                <img src={avatarPng} alt=""/>
            </div>

            My webpack app
            <div style={{background: 'black'}}>
                <AvatarSvg width={50} height={50} style={{color: 'red'}}/>
            </div>
            <Link to={'/shop'}>Shop</Link>
            <Link to={'/about'}>About</Link>
            <About/>
            <div className={classes.mainText}>
                Counter value: {count}
            </div>
            <button className={classes.button} onClick={TODO}>Increment counter</button>
            <Outlet/>
        </div>
    );
};