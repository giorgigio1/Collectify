import React, { useEffect, useState } from "react";
import Modal2 from "./LoginModal";
import { IoLogoDribbble } from "react-icons/io5";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import { baseApi } from "../baseAPI";
import MainHeader from "./MainHeader";

const Collection = () => {
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [collections, setCollections] = useState<
    {
      _id: string;
      name: string;
      cards: {
        name: string;
        description: string;
        topic: string;
        image: string;
        author: string;
        collectionId: string;
      }[];
    }[]
  >([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [currentCollectionId, setCurrentCollectionid] = useState("");

  const [formData, setFormData] = useState({
    newCollectionName: "",
    newCollectionDescription: "",
    newCollectionTopic: "",
    newCollectionImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleAddCollection = async () => {
    if (newCollectionName) {
      const response = await baseApi.post(
        "collection",
        { name: newCollectionName },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setCollections([...collections, response.data]);
      setNewCollectionName("");
      setShowAddCollectionModal(false);
    }
  };

  const handleCardModal = (id: string) => {
    setCurrentCollectionid(id);
    setShowAddCardModal(true);
  };

  const handleAddCard = async () => {
    const response = await baseApi.post(
      "card",
      {
        name: formData.newCollectionName,
        image: formData.newCollectionImage,
        description: formData.newCollectionDescription,
        topic: formData.newCollectionTopic,
        collectionId: currentCollectionId,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const newCollections = collections.map((collection) =>
      collection._id === response.data._id ? response.data : collection
    );
    setCollections(newCollections);
  };

  useEffect(() => {
    const fetchCollections = async () => {
      const response = await baseApi.get("collection", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setCollections(response.data);
    };
    fetchCollections();
  }, []);

  return (
    <div>
      {/* Header */}
      <Navbar bg="light" expand="lg">
        {/* ... (unchanged) */}
      </Navbar>

      {/* Body */}
      <Container className="mt-3">
        <Row>
          <Col>
            <h2>Collections</h2>

            <Button
              variant="outline-primary"
              className="mb-3"
              onClick={() => setShowAddCollectionModal(true)}
            >
              Add Collection
            </Button>

            <div className="card-deck">
              {collections.map((collection) => (
                <Card key={collection._id}>
                  {/* Collection Header */}
                  <Card.Header>{collection.name}</Card.Header>

                  {/* Collection Body - Items */}
                  <Card.Body>
                    <ul>
                      {collection.cards.map((item, index) => (
                        <>
                          <li key={index}>{item.name}</li>
                          <img src={item.image} alt="item img" />
                        </>
                      ))}
                    </ul>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleCardModal(collection._id)}
                    >
                      Add Card
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>

        {/* Add Collection Modal */}
        <Modal
          show={showAddCollectionModal}
          onHide={() => setShowAddCollectionModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCollectionName">
                <Form.Label>Collection Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter collection name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAddCollectionModal(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleAddCollection}>
              Add Collection
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showAddCardModal}
          onHide={() => setShowAddCardModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="newCollectionName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card name"
                  value={formData.newCollectionName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="newCollectionDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card description"
                  value={formData.newCollectionDescription}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="newCollectionTopic">
                <Form.Label>Topic</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card topic"
                  value={formData.newCollectionTopic}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="newCollectionImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card image"
                  value={formData.newCollectionImage}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAddCardModal(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleAddCard}>
              Add Card
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Footer */}
      <Container>{/* ... (unchanged) */}</Container>
    </div>
  );
};

export default Collection;
