import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {browserHistory} from 'react-router';
import firebase from 'firebase';
import Modal from 'react-modal';
class SearchResult extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false,
        };

        this.goToProfile = this.goToProfile.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    goToProfile(){
        console.log('the user is ', this.props.user);
        browserHistory.push(`/profile/${this.props.user.id}`);
    }

    openModal(){
        this.setState({modalIsOpen: true});
    }

    closeModal(){
        this.setState({modalIsOpen: false});
    }

    render(){

        let contactUser = null;
        if(!firebase.auth().currentUser){
            // create the code to display the modal, under same appearance as the normal button
            contactUser = <button type="button" id="contact_me_button" onClick={this.openModal}>Contact me!</button>

        } else {
            // user logged in, allow to contact through the normal button
            contactUser = <form action={"mailto:" + this.props.user.name + '.' + this.props.user.surname + '@jammin.com'}>
                <input type="submit" value="Contact me!" id="contact_me_button"/>
            </form>;
        }

        const customStyles = {
            overlay : {
                backgroundColor   : 'rgba(0, 0, 0, 0.75)'
            },
            content : {
                top: '20%',
                left: '20%',
                right: '20%',
                bottom: '20%',
            }
        };

        return(
        <Col xs={12}>
            <Row className="result">
                <Col xs={12} sm={4}>
                    <div className="profile-pic"><div className="image" style={{'background' : 'url(' + this.props.user.image + ')', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}} onClick={this.goToProfile.bind(this)}/></div>
                    {contactUser}
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        style={customStyles}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                    >

                        <h2 ref="subtitle">Contacting users</h2>
                        <p>To be able to contact Jammin users, please <a href="/register">register</a>, it's free! </p>
                        <div className="text-center" style={{'marginTop':'2.5em'}}>
                            <button onClick={this.closeModal} >close</button>
                        </div>
                    </Modal>
                </Col>
                <Col xs={12} sm={8}>
                    <h3 onClick={this.goToProfile}>{this.props.user.name} {this.props.user.surname}</h3>
                    <strong>{this.props.user.gender ? (this.props.user.gender === 'male' ? <p><FontAwesome name="male"/> {this.props.user.gender}</p> : <p><FontAwesome name="female"/>{this.props.user.gender}</p>) : 'Gender not specified'}</strong>
                    {this.props.user.age ? <strong><p>{this.props.user.age} years old</p></strong> : <p>Age not specified</p>}
                    <p style={{'marginTop' : '1em'}}>{this.props.user.about}</p>
                    <p className="user-availability" style={{'display' : 'none'}}>{this.props.user.availability}</p>
                    <Row className="result_info">
                        <Col xs={12} sm={6} className="filter_options">
                            <h4>Influences</h4>
                            {this.props.user.music_listen ? this.props.user.music_listen.map((artist) => {
                                return <a key={artist} className="tag" href="#0"><span>{artist}</span></a>;
                            }) : <div>No artist specified</div>}
                        </Col>
                        <Col xs={12} sm={6} className="filter_options">
                            <h4>Genres played</h4>
                            {this.props.user.music_play ? this.props.user.music_play.map((artist) => {
                                return <a className="tag" href="#0"><span>{artist}</span></a>;
                            }) : <div>No genres specified</div>}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        );
    }
}

export default SearchResult;