import React, { Component } from 'react';
import { Card, Spin, Button, Icon, Row, Col } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../state/Hotels/actions';

const Star = styled(Icon)`
  color: #fdbd0e;
`;

const ButtonPP = styled(Button)`
  background-color: #002879;
  border-color: #002879;
`;

const Amenitie = styled.img`
  width: 20px;
  height: 20px;
`;

const SpinStyled = styled(Spin)`
  width: auto !important;
  padding-left: 50%;
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

  render() {
    const { hotels, loading } = this.props;
    let CardHotel = [];

    if (hotels.length > 0) {
      hotels.map((item, index) => {
        let stars = [];
        let amenities = [];
        item.amenities.map((ameni, index) => {
          amenities.push(
            <Amenitie
              src={`${process.env.PUBLIC_URL}/img/amenities/${ameni}.svg`}
            />,
          );
        });

        CardHotel.push(
          <div key={index} style={{ padding: '5px' }}>
            <Card key={index} hoverable Title="Card">
              <Row>
                <Col span={10}>
                  <img
                    id={index}
                    src={`${process.env.PUBLIC_URL}/img/hotels/${item.image}`}
                    alt=""
                    style={{
                      maxWidth: '289px',
                      maxHeight: '213px',
                      Height: 'inherit !important',
                    }}
                  />
                </Col>
                <Col span={7}>
                  <h1 style={{ color: '#134385', fontSize: '18px' }}>
                    {item.name}
                  </h1>
                  {new Array(item.stars).fill(<Star type="star" />)}
                  <br />
                  {amenities}
                </Col>
                <Col span={7}>
                  <PriceDiv key={index}>
                    <span>Precio por noche por habitación</span>
                    <br />
                    <span style={{ fontSize: '15px', color: 'orange' }}>
                      ARS
                    </span>
                    <Price>{item.price}</Price>
                    <br />
                    <ButtonPP id={item.id} type="primary">
                      Ver hotel
                    </ButtonPP>
                  </PriceDiv>
                </Col>
              </Row>
            </Card>
          </div>,
        );
      });
    }

    return (
      <div style={{ padding: '30px' }}>
        <SpinStyled size="large" spinning={loading}>
          <Row gutter={16}>
            <Col span={8} />
            <Col span={16}>{CardHotel}</Col>
          </Row>
        </SpinStyled>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    hotels: state.hotels.hotels,
    loading: state.hotels.loading,
  };
};

export default connect(mapStateToProps, actions)(Hotels);
