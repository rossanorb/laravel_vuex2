import React, { Component } from 'react';

export default class Paginate extends Component {

    change = (event) => {
        this.props.changePage(+event.target.innerText);
    }

    next = () => {
        const { paginate } = this.props;
        let page = paginate.current_page + 1;

        if (page > paginate.last_page) page = paginate.last_page;
        this.props.changePage(page);
    }

    previous = () => {
        const { paginate } = this.props;
        let page = paginate.current_page - 1;

        if (page < 1) page = 1;
        this.props.changePage(page);
    }

    render() {
        const { paginate } = this.props;

        return (
            <div>
                <ul className="pagination justify-content-center">
                    <li className="page-item"><span className="page-link" style={{ cursor: "pointer" }} onClick={this.previous}> &lt; </span></li>
                    {[...Array(paginate.last_page)].map((x, i) =>
                        <li className={paginate.current_page === (i + 1) ? "page-item active" : "page-item"}
                            key={i} style={{ cursor: "pointer" }} >
                            <span className="page-link" onClick={this.change}>{i + 1}</span>
                        </li>
                    )}
                    <li className="page-item" style={{ cursor: "pointer" }} ><span className="page-link" onClick={this.next}> &gt; </span></li>
                </ul>
            </div>
        )
    }
}
