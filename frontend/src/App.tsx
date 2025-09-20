import React, { useState } from 'react';
import { Navbar, Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import MapComponent from './Map';
import './App.css';

export interface Place {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  formatted_address: string;
}

function App() {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Abandoned Buildings');
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/search', {
        location,
        category,
      });
      setPlaces(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Urbex Finder</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col md={4} className="sidebar">
            <h2>Search for a Location</h2>
            <Form onSubmit={handleSearch}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a city or address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Abandoned Buildings</option>
                  <option>Radio Towers</option>
                  <option>Industrial Sites</option>
                  <option>Tunnels</option>
                  <option>Bridges</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form>
          </Col>
          <Col md={8} className="map-container">
            <MapComponent places={places} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;