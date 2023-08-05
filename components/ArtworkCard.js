import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  if (error) return <Error statusCode={404} />;
  if (data) {
    const {title, primaryImageSmall, objectDate, objectID, classification, medium} = data
    return (
      <>
        <Card>
          <Card.Img
            src={
              primaryImageSmall
                ? primaryImageSmall
                : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
            }
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              <strong>Date: </strong>
              {objectDate}
              <br />
              <strong>Classification: </strong>
              {classification}
              <br />
              <strong>Medium: </strong>
              {medium}
              <br />
            </Card.Text>
            <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
              <Button variant="primary">
                <strong>ID: </strong>
                {objectID}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  } else return null;
}
