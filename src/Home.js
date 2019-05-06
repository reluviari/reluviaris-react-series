import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './Api'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            genres: [],
            isLoading: false
        }
    }
    componentDidMount() {
        setInterval(() => this.setState({ count: this.state.count + 1 }), 1000)

        this.setState({ isLoading: true })

        // axios.get('http://localhost:3000/genres')
        //     .then((res) => console.log(res))
        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }
    renderGenreLink(genre) {
        return (
            <span key={genre}>&nbsp;<Link to={`/series/${genre}`}> {genre}</Link>&nbsp;</span>
        )
    }
    render() {
        return (
            <div>
                <section id="intro" className="intro-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1><img src="/images/logo.png" /></h1>
                                <p>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou. {this.state.count}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    {
                        this.state.isLoading &&
                            <span>Aguarde, carregando...</span>
                    }
                    {
                        !this.state.isLoading &&
                            <span>
                                Ver séries do genêro:
                                
                                {this.state.genres.map(this.renderGenreLink)}
                            </span>
                    }
                </section>
            </div>
        )
    }
}

export default Home
