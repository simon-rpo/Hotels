import React, { Component } from 'react';
import {
  Card,
  Spin,
  Button,
  Icon,
  Row,
  Col,
  Collapse,
  Input,
  Radio,
} from 'antd';
import styled from 'styled-components';
import Responsive from 'react-responsive';
import { connect } from 'react-redux';
import * as actions from '../state/Hotels/actions';

const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;

const Star = styled(Icon)`
  color: #fdbd0e;
`;

const ButtonPP = styled(Button)`
  background-color: #002879;
  border-color: #002879;
  font-size: 20px;
  font-weight: bold;
  width: 145px;
  height: 35px;
`;

const Amenitie = styled.img`
  width: 20px;
  height: 20px;
`;

const SpinStyled = styled(Spin)`
  width: auto !important;
  padding-left: 100%;
  top: 50px;
  margin-top: -240px;
`;

const RadioStyled = styled(Radio)`
  display: block;
  height: 30px;
  line-height: 30px;
`;

const Price = styled.span`
  font-size: 25px;
  color: orange;
  font-weight: bold;
  padding-left: 10px;
`;

const PriceDiv = styled.div`
  text-align: center;
  border-left: 0.3px solid;

  @media (max-width: 767px) {
    border-top: 0.3px solid;
    border-left: 0px solid;
    padding-top: 5%;
    padding-bottom: 10%;
    margin-top: 10%;
  }
  padding-top: 22%;
  padding-bottom: 35%;
`;

class Hotels extends Component {
  constructor() {
    super();
  }

  componentDidMount = () => {
    this.props.getAllHotels();
  };

  HandleSearch = e => {
    const { hotels } = this.props;
    const filter = document.getElementById('inputHotel');
    this.props.filterHotels(hotels, filter.value);
  };

  HandleStarSearch = e => {
    const { hotels } = this.props;
    this.props.filterStars(hotels, e.target.value);
  };

  render() {
    const { hotels, hotelsFiltered, loading } = this.props;
    let CardHotel = [];

    if (hotels.length > 0 || hotelsFiltered.length > 0) {
      const HotelsData = hotelsFiltered.length > 0 ? hotelsFiltered : hotels;
      HotelsData.map((item, index) => {
        let stars = [];
        let amenities = [];

        item.amenities.map((ameni, index) => {
          amenities.push(
            <Amenitie
              key={index}
              src={`${process.env.PUBLIC_URL}/img/amenities/${ameni}.svg`}
            />,
          );
        });

        const HotelImage = (
          <img
            key={index}
            id={index}
            src={`${process.env.PUBLIC_URL}/img/hotels/${item.image}`}
            alt=""
            style={{
              maxWidth: '289px',
              maxHeight: '213px',
              Height: 'auto',
              width: '100%',
            }}
          />
        );
        const HotelInfo = (
          <div key={index}>
            <h1 style={{ color: '#134385', fontSize: '18px' }}>{item.name}</h1>
            {new Array(item.stars).fill(<Star type="star" />)}
            <br />
            {amenities}
          </div>
        );
        const PriceHotel = (
          <PriceDiv key={index}>
            <span>Precio por noche por habitación</span>
            <br />
            <span style={{ fontSize: '15px', color: 'orange' }}>ARS</span>
            <Price>{item.price}</Price>
            <br />
            <ButtonPP
              id={item.id}
              type="primary"
              style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Ver hotel
            </ButtonPP>
          </PriceDiv>
        );
        CardHotel.push(
          <div key={index} style={{ padding: '5px' }}>
            <Card key={index} hoverable style={{ minWidth: '300px' }}>
              <Row>
                <Desktop>
                  <Col span={10}>{HotelImage}</Col>
                  <Col span={7}>{HotelInfo}</Col>
                  <Col span={7}>{PriceHotel}</Col>
                </Desktop>
                <Tablet>
                  <Col span={14}>{HotelImage}</Col>
                  <Col span={5}>{HotelInfo}</Col>
                  <Col span={5}>{PriceHotel}</Col>
                </Tablet>
                <Mobile>
                  <Col span={24}>{HotelImage}</Col>
                  <Col span={24}>{HotelInfo}</Col>
                  <Col span={24}>{PriceHotel}</Col>
                </Mobile>
              </Row>
            </Card>
          </div>,
        );
      });
    }

    const Filters = (
      <Card title={'Filtros'} style={{ padding: '0px' }}>
        <Collapse defaultActiveKey={['1', '2']}>
          <Panel
            header={
              <div>
                <Icon
                  type="search"
                  style={{
                    color: '#134385',
                    marginRight: '5px',
                    fontWeight: 'bolder',
                  }}
                />
                <span style={{ color: '#134385' }}>Nombre de Hotel</span>
              </div>
            }
            key="1">
            <Input
              id="inputHotel"
              placeholder="¡Ingresa el nombre de Hotel!"
              style={{ width: '50%', marginRight: '10px' }}
            />
            <Button
              type="primary"
              onClick={this.HandleSearch}
              style={{ backgroundColor: '#002879', borderColor: '#002879' }}>
              Aceptar
            </Button>
          </Panel>
          <Panel
            header={
              <div>
                <Icon
                  type="star"
                  style={{ color: '#134385', marginRight: '5px' }}
                />
                <span style={{ color: '#134385' }}>Estrellas</span>
              </div>
            }
            key="2">
            <RadioGroup onChange={this.HandleStarSearch}>
              <RadioStyled value={0}>Todas las estrellas</RadioStyled>
              <RadioStyled value={5}>
                {new Array(5).fill(<Star type="star" />)}
              </RadioStyled>
              <RadioStyled value={4}>
                {new Array(4).fill(<Star type="star" />)}
              </RadioStyled>
              <RadioStyled value={3}>
                {new Array(3).fill(<Star type="star" />)}
              </RadioStyled>
              <RadioStyled value={2}>
                {new Array(2).fill(<Star type="star" />)}
              </RadioStyled>
              <RadioStyled value={1}>
                <Star type="star" />
              </RadioStyled>
            </RadioGroup>
          </Panel>
        </Collapse>
      </Card>
    );

    return (
      <div style={{ padding: '30px' }}>
        <SpinStyled size="large" spinning={loading}>
          <Row gutter={16}>
            <Row gutter={16}>
              <Mobile>
                <Col span={24}>{Filters}</Col>
                <Col span={24}>{CardHotel}</Col>
              </Mobile>
              <Tablet>
                <Col span={12}>{Filters}</Col>
                <Col span={12}>{CardHotel}</Col>
              </Tablet>
              <Desktop>
                <Col span={6}>{Filters}</Col>
                <Col span={18}>{CardHotel}</Col>
              </Desktop>
            </Row>
          </Row>
        </SpinStyled>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    hotels: state.hotels.hotels,
    hotelsFiltered: state.hotels.hotelsFiltered,
    loading: state.hotels.loading,
  };
};

export default connect(mapStateToProps, actions)(Hotels);
