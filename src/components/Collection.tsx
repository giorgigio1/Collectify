import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";

const Collection = () => {
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
  const [collections, setCollections] = useState([
    { id: 1, name: "Collection 1", items: ["Item 1", "Item 2"] },
    { id: 2, name: "Collection 2", items: ["Item 3", "Item 4"] },
  ]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newItemName, setNewItemName] = useState("");

  const handleAddCollection = () => {
    if (newCollectionName) {
      setCollections((prevCollections) => [
        ...prevCollections,
        { id: Date.now(), name: newCollectionName, items: [] },
      ]);
      setNewCollectionName("");
      setShowAddCollectionModal(false);
    }
  };

  const handleAddItem = (collectionId: any) => {
    if (newItemName) {
      setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection.id === collectionId
            ? { ...collection, items: [...collection.items, newItemName] }
            : collection
        )
      );
      setNewItemName("");
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg"></Navbar>
      <Container className="mt-3">
        <Row>
          <Col>
            <h2>Collections</h2>
            {
                
            }

            <Button
              variant="outline-primary"
              className="mb-3"
              onClick={() => setShowAddCollectionModal(true)}
            >
              Add Collection
            </Button>

            <div className="card-deck">
              {collections.map((collection) => (
                <Card key={collection.id}>
                  <Card.Header>{collection.name}</Card.Header>
                  <Card.Body>
                    <ul>
                      {collection.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleAddItem(collection.id)}
                    >
                      Add Item
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
      </Container>

      {/* Footer */}
      <Container>{/* ... (unchanged) */}</Container>
    </div>
  );
};

export default Collection;
