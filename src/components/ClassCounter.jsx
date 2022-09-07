import React, {Component} from 'react'

class ClassCounter extends Component {
    // state = {  }
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }

    increment () {
        this.setState({count: this.state.count + 1})
    }

    decrement () {
        this.setState({count: this.state.count - 1})
    }



    render() {
        return (
            <div>
                <h1>
                    {this.state.count}
                </h1>

                <button onClick={this.increment} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">добавить</button>
                <button onClick={this.decrement}>убрать</button>
            </div>
        );
    }
}

export default ClassCounter;