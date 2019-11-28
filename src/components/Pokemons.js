import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from './Utilits';

class Pokemons extends Component {
  state = {
    pokemons: [],
    pokemonsTypes:[],
		images: [],
		modalOpen: false,
    modalPokemon_skills: [],
    modalPokemon_moves:[]
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v1/pokemon/${this.props.name}/`,
      )
      .then(res => {
        this.setState({
					pokemons: res.data,
          images: res.data.sprites.front_default,
          pokemonsTypes: res.data.types[0].type.name,
        });
        //console.log(this.state.pokemonsTypes)
			})
      .catch(err => console.log(err));
  }  

	getItem = id => {
		let pokemon=0;
		const arr = Object.keys(this.state.pokemons).map(
			i => this.state.pokemons[i]);
			if(arr[6]===id){
				pokemon=arr;
			}
			//console.log(pokemon)
		return pokemon;
	}

	modalOpen = id => {
		const pokemon = this.getItem(id);
    this.state.modalPokemon_skills.push(pokemon[14]);
    this.state.modalPokemon_moves.push(pokemon[9]);
    //console.log(this.state.modalPokemon_moves);
		this.setState(()=>{
      return { modalOpen:true}
    })
    //console.log(pokemon)
	}

	closeModal = () => {
		this.setState(()=>{
			return {modalOpen:false}
		})
		//console.log(this.state.modalOpen)
	}

	render() {
    const { name } = this.props;
    const { pokemons, images } = this.state;
    return (
      <PockemonsWrapper className='col-9 mx-auto col-md-3 col-lg-4 my-3'>
        <div
          className='card mb-4 shadow-sm'
          onClick={() => {
            this.getItem(pokemons.id);
            this.modalOpen(pokemons.id);
          }}
        >
          <div className='card-body p-3'>
            <img className='card-image' src={images} alt="pokemon"/>
            <div className="pl-5 text-center d-grid">
              <h3>Weapon</h3>      
              <h2 style={{color:"red"}}>{this.state.pokemonsTypes}</h2>
            </div>
          </div>
          <div className='card-footer d-flex justify-content-around'>
            <h5 className='text-blue text-uppercase font-bold mb-0'>{name}</h5>
          </div>
        </div>
        {this.state.modalOpen ? 
        (<ModalContainer disabled>
          <div className="modal-content">
            <div className='modal-header'>
                <h1>{name}</h1>
            </div>
              <div className='modal-body'>
                <img
                    src={this.state.images}
                    className='container-fluid'
                    alt='pokemon'
                  />
                <div className="container_skills">
                  <h1 className="text-capitalize">Skills</h1>
                  {this.state.modalPokemon_skills[0].map((item,index)=>
                      <div className="animate_skills" key={index}>
                        <h5>{item.stat.name}</h5>
                          <span className="anime" style={{ width: item.base_stat}}>{item.base_stat}</span>
                      </div>)}
                </div> 
                <div className="container_moves">
                  <h1 className="text-capitalize">SuperMoves</h1>
                  {this.state.modalPokemon_moves[0].map((item,index)=>
                      index<=10?
                      <div className="moves" key={index}>
                        <h5>{item.move.name}</h5>
                      </div>:null)}
                </div> 
              </div>
              <div className="modal-footer">
                <Button onClick={() => this.closeModal()}>
                back to choose
                </Button>
              </div>
           </div> 
        </ModalContainer>): null}
      </PockemonsWrapper>
    );
  }
}

const PockemonsWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
    cursor: pointer;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 3s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }

    .card-footer {
      background: rgba(0,123,255,1);
    }
  }

  .card-body {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .card-image {
    transition: all 1s linear;
  }
  
  .card-body:hover .card-image{
    transform: scale(1.5);
  }

  .d-grid {
    opacity: 0.1;
    transition: all 3s linear;
  }

  .card-body:hover .d-grid {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const ModalContainer = styled.div`
  .modal-content {
	position: fixed;
	z-index: 1;
	left:0;
	top:0;
	height:100%;
	width:100%;
	overflow: auto;
  background-color:rgba(0,0,0,0.5)
}

.anime::before {
    content: '';
    bottom: 0;
    border-bottom: 1.4vh solid red;
    position: absolute;
    width: 0;
    opacity: 0;
    transition: 2s;
}

.animate_skills span {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    height: 1.5vh;
    font-size: 1.5vh;
}

.anime {
    background-color: red;
    position: relative;
    animation-name: anime;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-delay: 1s;
    animation-direction: reverse;
    animation-iteration-count: 1;
    animation-fill-mode: both;
}

@keyframes anime {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.container_skills {
  color: #fff;
  margin-top: inherit;
}

.container_moves {
  color: #fff;
  margin-top: inherit;
}

.modal-header {
  border-bottom: 5px #fff solid;
	background: grey;
	padding-top: 5rem;
  color:#fff;
	display: inline-flex;
	align-items: baseline;
	width:100%;
	justify-content: space-around;
}

.modal-body {
  display: inline-flex;
	background-color: transparent;
	margin:10% auto;
	width:70%;
	box-shadow:0 5px 8px 0 rgba(0,0,0,0.2),0 7px 20px 0 rgba(0,0,0,0.2);
	animation-name: modalopen;
	animation-duration: 1s;
}

.modal-footer {
  display: flex;
  justify-content: center;
	background:#007bff;
	padding: 0.5rem;
	color:#fff;
  text-align: center;
  border: 5px solid #fff;
}

@keyframes modalopen {
	from{opacity:0}
	to{opacity:1}
}

.container-fluid {
  width:60%;
}
`;

export default Pokemons;