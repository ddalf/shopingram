import React from 'react'
import SignUp from './components/signup/index.js'
import SignIn from './components/signIn/index.js'
import Style from './index.scss'
import Footer from '@components/footer'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignUp: true
        }
    }

    toggleSign () {
        this.setState({
            isSignUp: !this.state.isSignUp
        })
    }

    render () {
        return (
            <main className={Style.login}>
                <article className="login_info">
                    <section className="descript">
                        <div className="photo"><div className="logoImg"></div></div>
                    </section>
                    <section className="login_dialog">
                        {
                            this.state.isSignUp
                            ? <SignIn />
                            : <SignUp toggleSign={this.toggleSign.bind(this)}/>
                        }
                        <div className="toggle_ways">
                            {
                                this.state.isSignUp
                                ?<span>계정이 없으십니까？<a className="notice" onClick={this.toggleSign.bind(this)}>회원가입</a></span>
                                :<span>계정이 존재합니까?<a className="notice" onClick={this.toggleSign.bind(this)}>로그인</a></span>
                            }
                        </div>
                    </section>
                </article>
                <Footer />
            </main>
        )
    }
}

export default Login