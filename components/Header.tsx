import logo from '../logo.png'
import s from './Header.module.css'
import Link from "next/link";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Badge } from 'antd';


const Header = ()=>{
    return(
        <div className ={s.header}>
            <div className={s.logobox}>
                <Link  href="/">
             <img src={logo.src} alt="logo" className ={s.logo}></img>
            </Link> 
            </div>
            <div className={s.books}>
                <Link  href="/books">All books</Link> 
            </div>
            <div className={s.button} >
           <Badge count={0} showZero offset={[6, 11]}>
           <Link  href="/cart">
          <Button type="primary" shape="circle" icon={<ShoppingCartOutlined />} size='large' />
          </Link> 
        </Badge>
        </div>
        </div>
    )
}

export default Header;