import React, { Component } from "react";
import Slider from "react-slick";

export default class SleekSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        return (
            <div>
                
                <Slider {...settings}>
                    <div>
                        <img className="img-fluid" src={require("../assets/img/s1.PNG")} />
                    </div>
                    <div>
                        <img className="img-fluid" src={require("../assets/img/s2.PNG")} />
                    </div>
                    <div>
                        <img className="img-fluid" src={require("../assets/img/s3.PNG")} />
                    </div>
                    <div>
                        <img className="img-fluid" src={require("../assets/img/s4.PNG")} />
                    </div>
                    <div>
                        <img className="img-fluid" src={require("../assets/img/s5.PNG")} />
                    </div>
                    <div>
                        <img className="img-fluid" src={require("../assets/img/s6.PNG")} />
                    </div>
                    {/* <div>
                        <img className="img-fluid" src={require("../assets/img/s7.PNG")} />
                    </div> */}
                </Slider>
            </div>
        );
    }
}