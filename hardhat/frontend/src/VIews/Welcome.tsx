import React from 'react';
import Container from '../Components/Container/Container';
import OuterContainer from '../Components/OuterContainer/OuterContainer';
import InnerContainer from '../Components/InnerContainer/InnerContainer';
import Logo from '../Components/Image/Image';
import LogoText from '../Components/LogoText/LogoText';
import votepng from '../Components/Image/vote.png';

interface Props {
    loopDuration: number,
}

interface State {
    index: number,
    finished: boolean,
}


class Welcome extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            finished: false,
            index: 0
        };
        this.timer = this.timer.bind(this);
    }


    componentDidMount() {
        if (!this.props.loopDuration) {
            this.setState({finished: true});
        } else {
            this.timer(0);
        }
    }

    timer(i: number) {
        const dur = 3000;
        this.setState({index: i});
        setTimeout(() => this.setState({finished: true}), dur);
    }


    render() {
        const data = {
            image: votepng,
            text: 'Vote with the blockchain ! by Hemesky ',
            imageAnimation: 'rotateIn',
            textAnimation: 'fadeInDown',
            backgroundColor: 'whitesmoke',
            textColor: 'black',
        };


        return (
            <Container status={this.state.finished ? 'finished' : 'moveOn'}>
                <OuterContainer
                    className="react-welcome-page"
                    prevBackColor="whitesmoke"
                    animation={3000}
                    backColor={data.backgroundColor}
                    index={this.state.index}
                    key={this.state.index}
                >
                    <InnerContainer>
                        <Logo duration={3000}
                              className={`animated ${data.imageAnimation}`} image={data.image}/>
                        <LogoText
                            textColor={data.textColor}
                            duration={3000}
                            className={` ${data.textAnimation}`}> {data.text} </LogoText>
                    </InnerContainer>
                </OuterContainer>
            </Container>
        )
    }
}

export default Welcome;