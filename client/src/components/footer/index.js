import React from 'react'
import Style from './index.scss'
class Footer extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
 
    render () {
        return (
            <footer className={Style['page-footer']}>
                <ul className="nav">
                </ul>
                <span className="sign u-f-lightblack2">© 2019 ShopinGram</span>
            </footer>
        )
    }

}
export default Footer