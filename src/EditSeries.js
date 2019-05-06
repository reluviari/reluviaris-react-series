import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Para Assistir',
}

class EditSeries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genres: [],
            isloading: false,
            redirect: false,
            series: {}
        }
        this.saveSeries = this.saveSeries.bind(this)
    }
    componentDidMount() {
        this.state = { isloading: true }
        api.loadSeriesById(this.props.match.params.id)
            .then((res) => {
                this.setState({
                    isloading: false,
                    series: res.data
                })
                this.refs.name.value = this.state.series.name
                this.refs.genre.value = this.state.series.genre
                this.refs.status.value = this.state.series.status
                this.refs.comments.value = this.state.series.comments
            })
        api.loadGenres()
            .then((res) => {
                this.setState({
                    genres: res.data
                })
            })
    }
    saveSeries() {
        const serie = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value,
        }

        api.updateSeries(serie)
            .then((res) => {
                this.setState({
                    redirect: '/series/' + this.refs.genre.value
                })
            })
    }
    render() {
        return (
            <section className='intro-section'>
                {this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
                <h1>Editar Série</h1>
                <form>
                    Nome: <input ref='name' type='text' className='form-control' /><br />
                    Status:
                        <select ref='status'>
                        {
                            Object
                                .keys(statuses)
                                .map(key => <option key={key} value={key}> {statuses[key]} </option>)
                        }
                    </select><br />
                    Genero:
                        <select ref='genre'>
                        {
                            this.state.genres
                                .map(key => <option key={key} value={key}> {key} </option>)
                        }
                    </select><br />
                    Comentários: <textarea ref='comments' className='form-control'></textarea><br />
                    <button type='button' onClick={this.saveSeries}>Salvar</button>
                </form>
            </section>
        )
    }
}

export default EditSeries
