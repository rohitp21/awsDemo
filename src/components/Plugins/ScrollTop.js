import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons'

export default class ScrollTop extends Component {
    state = {
        showScroll: false
    }
    componentDidMount(){
        window.addEventListener("scroll", () => {
            this.checkScrollTop()
          });
    }
    checkScrollTop = () => {
        if (!this.state.showScroll && window.pageYOffset > 400) {
            this.setState({ showScroll: true })
        } else if (this.state.showScroll && window.pageYOffset <= 400) {
            this.setState({ showScroll: false })
        }
    };

    scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    //window.addEventListener('scroll', checkScrollTop)
    
    render() {
        return (
            <div>
                <FontAwesomeIcon className="scrollTop" onClick={this.scrollTop} style={{display: this.state.showScroll ? 'flex' : 'none'}} size="lg" icon={faChevronCircleUp} color='#0C2461' />
            </div>
        )
    }
}
